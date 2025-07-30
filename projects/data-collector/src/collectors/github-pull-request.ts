import type { GitHubPullRequestData } from "../typings/github";
import type { PrismaClient } from "@prisma/client";
import { DataType } from "@prisma/client";
import { generateGitHubPullRequestId } from "@somni.one/common";
import { createOctokit } from "../lib/octokit";
import DataCollectorBase from "./base";

export default class GitHubPullRequestDataCollector extends DataCollectorBase<GitHubPullRequestData> {
  constructor(
    private readonly repositoryOwner: string,
    private readonly repositoryName: string,
    private readonly pullRequestNumber: number,
  ) { super(); }

  public override readonly recollectMinimumPeriod = 60 * 60 * 24; // 24 hours (1 day)
  public override readonly dataType: DataType = DataType.GitHubPullRequest;

  public override get dataId(): string {
    return generateGitHubPullRequestId(this.repositoryOwner, this.repositoryName, this.pullRequestNumber);
  }

  public override async collect(db: PrismaClient): Promise<GitHubPullRequestData> {
    // Create Octokit for querying GitHub API
    const octokit = createOctokit(true);

    let structedData: GitHubPullRequestData;
    try {
      // Query API
      const { data: response } = await octokit.rest.pulls.get({
        owner: this.repositoryOwner,
        repo: this.repositoryName,
        pull_number: this.pullRequestNumber,  // eslint-disable-line camelcase
      });

      // Struct data
      structedData = {
        url: response.html_url,
        title: response.title.split("\n")[0],
        pullRequestNumber: response.number,
        state: response.state,
        createdAt: response.created_at,
        doneAt: response.merged_at,
        changes: {
          additions: response.additions,
          deletions: response.deletions,
        },
      };
    } catch(error) {
      console.error("Failed to retrieve GitHub pull request data!");
      throw error;
    }

    // Create or update the data into database
    await this.createOrUpdateData(db, structedData);

    // If successfully inserted, return the structured data
    return structedData;
  }
}
