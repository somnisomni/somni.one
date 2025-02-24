import type { GitHubCommitData } from "$/routes/me/api/github/commit/+server";
import type { GitHubPullRequestData } from "$/routes/me/api/github/pull-request/+server";

export const githubPullRequestDataStore = $state<Record<string, GitHubPullRequestData>>({ });
export const githubCommitDataStore = $state<Record<string, GitHubCommitData>>({ });
