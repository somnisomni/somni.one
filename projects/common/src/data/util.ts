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
