export interface GitCommitChanges {
  additions?: number;
  deletions?: number;
}

export interface GitHubCommitData {
  commitHash: string;
  commitHashShort: string;
  url: string;
  title: string;
  changes: GitCommitChanges;
}

export interface GitHubPullRequestData {
  pullRequestNumber: number;
  url: string;
  title: string;
  state: "open" | "closed" | "merged";
  changes: GitCommitChanges;
  createdAt: string;
  doneAt: string | null;
}

export enum GitHubDataResponseType {
  Commit = "commit",
  PullRequest = "pull-request",
}

export type GitHubDataResponse = {
  type: GitHubDataResponseType.Commit;
  data: GitHubCommitData;
} | {
  type: GitHubDataResponseType.PullRequest;
  data: GitHubPullRequestData;
};
