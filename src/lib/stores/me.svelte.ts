import type { GitHubPullRequestData, GitHubCommitData } from "$/lib/typings/github";

export const githubPullRequestDataStore = $state<Record<string, GitHubPullRequestData>>({ });
export const githubCommitDataStore = $state<Record<string, GitHubCommitData>>({ });
