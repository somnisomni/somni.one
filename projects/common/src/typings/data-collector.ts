export interface DataCollectorResponse {
  dataId: string;
  dataType: DataType;
  data: Record<string, any> | null; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// NOTE: Make sure to keep this enum in sync with the DB schema (see `schema.prisma` in data collector)
export enum DataType {
  Unknown = "Unknown",
  GitHubCommit = "GitHubCommit",
  GitHubPullRequest = "GitHubPullRequest",
}
