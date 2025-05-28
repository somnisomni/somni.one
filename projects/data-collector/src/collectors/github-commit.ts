import type { GitHubCommitData } from "../typings/github";
import type { PrismaClient } from "@prisma/client";
import { DataType } from "@prisma/client";
import { createOctokit } from "../lib/octokit";
import DataCollectorBase from "./base";

export default class GitHubCommitDataCollector extends DataCollectorBase<GitHubCommitData> {
  constructor(
    private readonly repositoryOwner: string,
    private readonly repositoryName: string,
    private readonly commitHash: string,
  ) { super(); }

  public override readonly RecollectMinimumPeriod = 60 * 60 * 24; // 24 hours (1 day)
  public override readonly DataType: DataType = DataType.GitHubCommit;

  protected override get dataId(): string {
    return `github-commit/${this.repositoryOwner}/${this.repositoryName}/${this.commitHash}`;
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

    // Insert data into database
    try {
      const dbData = await db.data.create({
        data: {
          dataType: this.DataType,
          dataId: this.dataId,
          data: JSON.stringify(structedData),
        },
      });

      if(!dbData || !dbData.data) {
        throw new Error("Inserted data is invalid!");
      }
    } catch(error) {
      console.error("Failed to insert data into database!");
      throw error;
    }

    // If successfully inserted, return the structured data
    return structedData;
  }
}
