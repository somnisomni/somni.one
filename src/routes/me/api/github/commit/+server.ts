import type { GitHubCommitData } from "$/lib/typings/github";
import type { RequestHandler } from "./$types";
import { createOctokit } from "$lib/server/octokit";

const cacheMap = new Map<string, GitHubCommitData>();

export const GET: RequestHandler = async (request) => {
  const params = request.url.searchParams;
  const repoUrl = params.get("repositoryUrl");
  const commitHash = params.get("commit");

  /* Param check */
  if(!repoUrl || !commitHash) {
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
  const { data } = await octokit.rest.repos.getCommit({
    owner: repoOwner,
    repo: repoName,
    ref: commitHash,
  });

  /* Struct data */
  const result: GitHubCommitData = {
    commitHash: data.sha,
    commitHashShort: data.sha.slice(0, 7),
    url: data.html_url,
    title: data.commit.message.split("\n")[0],
    changes: {
      additions: data.stats?.additions,
      deletions: data.stats?.deletions,
    },
  };

  /* Cache data */
  cacheMap.set(params.toString(), result);

  /* Response */
  return new Response(JSON.stringify(result), { status: 200 });
};
