import type { GitHubCommitData, GitHubDataResponse, GitHubPullRequestData } from "$/lib/typings/github";
import type { MeContributionDataBase } from "$/lib/typings/me-data";
import type { RequestHandler } from "./$types";
import { GitHubDataResponseType } from "$/lib/typings/github";
import { MeDataType } from "$/lib/typings/me-data";
import { createOctokit } from "$lib/server/octokit";

const cacheMap = new Map<string, GitHubDataResponse[]>();

export const GET: RequestHandler = async (request) => {
  const params = request.url.searchParams;
  const type = params.get("type") as MeDataType;
  const idList = params.get("id")?.split(",");

  /* Param check */
  if(!type || (!idList || idList.length <= 0)) {
    return new Response("Invalid or missing parameters", { status: 400 });
  }

  if(!(type === MeDataType.CONTRIBUTION_OPENSOURCE || type === MeDataType.CONTRIBUTION_TRANSLATION)) {
    return new Response("Invalid type", { status: 400 });
  }

  /* Get data */
  const data = (((await import(`$lib/server/data/${type}.json`)).default as MeContributionDataBase[]) ?? []).filter(d => idList.indexOf(d.id) >= 0);
  if(!data || data.length <= 0) {
    return new Response("Invalid type or ID", { status: 400 });
  }

  /* Iteration */
  const octokit = createOctokit(true);
  const responseData: Record<string, GitHubDataResponse[]> = { };
  for(const d of data) {
    /* Check contributions */
    if(!d.contributions || d.contributions.length <= 0) {
      continue;
    }

    /* Check cache */
    const cacheId = `${type}/${d.id}`;
    if(cacheMap.has(cacheId)) {
      responseData[d.id] = cacheMap.get(cacheId) as GitHubDataResponse[];
      continue;
    }

    /* Repo URL check */
    const match = d.repositoryUrl?.match(/github\.com\/([^/]+)\/([^/]+)/);
    if(!match) {
      return new Response(`Not a GitHub repo URL for specified type/ID  (id: ${d.id})`, { status: 400 });
    }

    /* Fetch data */
    const repoOwner = match[1];
    const repoName = match[2];
    const dataArray = [] as GitHubDataResponse[];

    for(const c of d.contributions) {
      let responseType!: GitHubDataResponseType;
      let structedData!: GitHubPullRequestData | GitHubCommitData;

      try {
        if(c.directCommit) {
          /* Fetch commit data */
          const { data: response } = await octokit.rest.repos.getCommit({
            owner: repoOwner,
            repo: repoName,
            ref: c.directCommit,
          });

          /* Struct commit data */
          structedData = {
            commitHash: response.sha,
            commitHashShort: response.sha.slice(0, 7),
            url: response.html_url,
            title: response.commit.message.split("\n")[0],
            changes: {
              additions: response.stats?.additions,
              deletions: response.stats?.deletions,
            },
          };
          responseType = GitHubDataResponseType.Commit;
        } else if(c.pullRequest) {
          /* Fetch pull request data */
          const { data: response } = await octokit.rest.pulls.get({
            owner: repoOwner,
            repo: repoName,
            pull_number: c.pullRequest,  // eslint-disable-line camelcase
          });

          /* Struct pull request data */
          structedData = {
            pullRequestNumber: response.number,
            url: response.html_url,
            title: response.title,
            state: response.merged ? "merged" : response.state,
            changes: {
              additions: response.additions,
              deletions: response.deletions,
            },
            createdAt: response.created_at,
            doneAt: response.merged_at ?? response.closed_at,
          };
          responseType = GitHubDataResponseType.PullRequest;
        }
      } catch(error) {
        console.error("Error during fetching or structing data from GitHub API", error);
        return new Response("Failed to fetch or struct data from GitHub API", { status: 500 });
      }

      dataArray.push({
        type: responseType,
        data: structedData,
      } as GitHubDataResponse);
    }

    /* Cache data */
    cacheMap.set(cacheId, dataArray);
    responseData[d.id] = dataArray;
  }

  /* Response */
  return new Response(JSON.stringify(responseData), { status: 200 });
};
