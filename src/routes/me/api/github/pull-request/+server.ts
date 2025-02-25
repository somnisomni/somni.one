import type { GitHubPullRequestData } from "$/lib/typings/github";
import type { RequestHandler } from "./$types";
import { createOctokit } from "$lib/server/octokit";

const cacheMap = new Map<string, GitHubPullRequestData>();

export const GET: RequestHandler = async (request) => {
  const params = request.url.searchParams;
  const repoUrl = params.get("repositoryUrl");
  const pullId = parseInt(params.get("pullRequest") ?? "-1");

  /* Param check */
  if(!repoUrl || pullId <= 0) {
    return new Response("Bad Request", { status: 400 });
  }

  /* Cache check */
  if(cacheMap.has(params.toString())) {
    return new Response(JSON.stringify(cacheMap.get(params.toString())), { status: 200 });
  }

  /* URL check */
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if(!match) {
    return new Response("Bad Request", { status: 400 });
  }

  /* Fetch data */
  const octokit = createOctokit(true);
  const repoOwner = match[1];
  const repoName = match[2];
  const { data } = await octokit.rest.pulls.get({
    owner: repoOwner,
    repo: repoName,
    pull_number: pullId,  // eslint-disable-line camelcase
  });

  /* Struct data */
  const result: GitHubPullRequestData = {
    pullRequestNumber: data.number,
    url: data.html_url,
    title: data.title,
    state: data.merged ? "merged" : data.state,
    changes: {
      additions: data.additions,
      deletions: data.deletions,
    },
    createdAt: data.created_at,
    doneAt: data.merged_at ?? data.closed_at,
  };

  /* Cache data */
  cacheMap.set(params.toString(), result);

  /* Response */
  return new Response(JSON.stringify(result), { status: 200 });
};
