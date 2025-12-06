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

export interface GitHubUserData {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
}
