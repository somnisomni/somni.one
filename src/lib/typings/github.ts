export interface GitHubCommitData {
  commitHash: string;
  commitHashShort: string;
  url: string;
  title: string;
  changes: {
    additions?: number;
    deletions?: number;
  };
}

export interface GitHubPullRequestData {
  pullRequestNumber: number;
  url: string;
  title: string;
  state: "open" | "closed" | "merged";
  createdAt: string;
  doneAt: string | null;
}
