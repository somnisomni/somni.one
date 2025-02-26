import type { GitHubCommitData, GitHubDataResponse, GitHubPullRequestData } from "$/lib/typings/github";
import type { MeDataType, MeDataBase } from "$/lib/typings/me-data";
import type { RequestHandler } from "./$types";
import { GitHubDataResponseType } from "$/lib/typings/github";
import { createOctokit } from "$lib/server/octokit";

const cacheMap = new Map<string, GitHubDataResponse>();

export const GET: RequestHandler = async (request) => {
  const params = request.url.searchParams;
  const type = params.get("type") as MeDataType | null;
  const id = params.get("id");
  const commit = params.get("commit");
  const pullRequest = params.get("pr");

  /* Param check */
  if(!type || !id || (!commit && !pullRequest)) {
    return new Response("Invalid or missing parameters", { status: 400 });
  }

  /* Cache check */
  const cacheId = `${type}/${id}/${commit ?? pullRequest}`;
  if(cacheMap.has(cacheId)) {
    return new Response(JSON.stringify(cacheMap.get(cacheId)), { status: 200 });
  }

  /* Get data */
  const data = (((await import(`$lib/server/data/${type}.json`)).default as MeDataBase[]) ?? []).find(d => d.id === id);
  if(!data || !data.repositoryUrl) {
    return new Response("Invalid type or ID", { status: 400 });
  }

  /* Repo URL check */
  const match = data.repositoryUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if(!match) {
    return new Response("Not a GitHub repo URL for specified type/ID", { status: 400 });
  }

  /* Fetch data */
  const octokit = createOctokit(true);
  const repoOwner = match[1];
  const repoName = match[2];
  let responseType!: GitHubDataResponseType;
  let structedData!: GitHubPullRequestData | GitHubCommitData;

  try {
    if(commit) {
      /* Fetch commit data */
      const { data: response } = await octokit.rest.repos.getCommit({
        owner: repoOwner,
        repo: repoName,
        ref: commit,
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
    } else if(pullRequest) {
      /* Fetch pull request data */
      const { data: response } = await octokit.rest.pulls.get({
        owner: repoOwner,
        repo: repoName,
        pull_number: parseInt(pullRequest),  // eslint-disable-line camelcase
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

  /* Cache data */
  const responseData: GitHubDataResponse = {
    type: responseType,
    data: structedData,
  };
  cacheMap.set(cacheId, responseData);
  if(responseData.type === GitHubDataResponseType.PullRequest) {
    responseData.data;
  }
  /* Response */
  return new Response(JSON.stringify(responseData), { status: 200 });
};
