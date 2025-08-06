export function sliceGitHubRepoUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);

  if(match) {
    return {
      owner: match[1],
      repo: match[2],
    };
  }

  return null;
}

export function generateGitHubCommitId(
  repositoryOwner: string,
  repositoryName: string,
  commitHash: string,
): `github-commit/${string}/${string}/${string}` {
  return `github-commit/${repositoryOwner}/${repositoryName}/${commitHash}`;
}

export function generateGitHubPullRequestId(
  repositoryOwner: string,
  repositoryName: string,
  pullRequestNumber: number,
): `github-pull-request/${string}/${string}/${number}` {
  return `github-pull-request/${repositoryOwner}/${repositoryName}/${pullRequestNumber}`;
}

export function generateSteamUserId(username: string): `steam-user/${string}` {
  return `steam-user/${username}`;
}
