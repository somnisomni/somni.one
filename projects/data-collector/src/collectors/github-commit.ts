import type { GitHubCommitData } from "@somni.one/common";
import type { PrismaClient } from "@prisma/client";
import { DataType } from "@prisma/client";
import { generateGitHubCommitId } from "@somni.one/common";
import { createOctokit } from "../lib/octokit";
import DataCollectorBase from "./base";

export default class GitHubCommitDataCollector extends DataCollectorBase<GitHubCommitData> {
  constructor(
    private readonly repositoryOwner: string,
    private readonly repositoryName: string,
    private readonly commitHash: string,
  ) { super(); }

  public override readonly recollectMinimumPeriod = 60 * 60 * 24; // 24 hours (1 day)
  public override readonly dataType: DataType = DataType.GitHubCommit;

  public override get dataId(): string {
    return generateGitHubCommitId(this.repositoryOwner, this.repositoryName, this.commitHash);
  }

  public override async collect(db: PrismaClient): Promise<GitHubCommitData> {
    // Create Octokit for querying GitHub API
    const octokit = createOctokit(true);

    let structedData: GitHubCommitData;
    try {
      // Query API
      const { data: response } = await octokit.rest.repos.getCommit({
        owner: this.repositoryOwner,
        repo: this.repositoryName,
        ref: this.commitHash,
      });

      // Struct data
      structedData = {
        commitHash: response.sha,
        commitHashShort: response.sha.substring(0, 7),
        url: response.html_url,
        title: response.commit.message.split("\n")[0],
        changes: {
          additions: response.stats?.additions,
          deletions: response.stats?.deletions,
        },
      };
    } catch(error) {
      console.error("Failed to retrieve GitHub commit data!");
      throw error;
    }

    // Create or update the data into database
    await this.createOrUpdateData(db, structedData);

    // If successfully inserted, return the structured data
    return structedData;
  }
}
