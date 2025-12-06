import type { PrismaClient } from "../generated/prisma-client/client";
import type { GitHubUserData } from "@somni.one/common";
import { generateGitHubUserId } from "@somni.one/common";
import { DataType } from "../generated/prisma-client/enums";
import { createOctokit } from "../lib/octokit";
import DataCollectorBase from "./base";

export default class GitHubUserDataCollector extends DataCollectorBase<GitHubUserData> {
  constructor(
    private readonly username: string,
  ) { super(); }

  public override readonly recollectMinimumPeriod = 60 * 60 * 24; // 24 hours (1 day)
  public override readonly dataType: DataType = DataType.GitHubUser;

  public override get dataId(): string {
    return generateGitHubUserId(this.username);
  }

  public async collect(db: PrismaClient): Promise<GitHubUserData> {
    // Create Octokit for querying GitHub API
    const octokit = createOctokit(true);

    let structedData: GitHubUserData;
    try {
      // Query API
      const { data: response } = await octokit.rest.users.getByUsername({
        username: this.username,
      });

      // Struct data
      structedData = {
        username: response.login,
        avatarUrl: response.avatar_url,
        profileUrl: response.html_url,
        followers: response.followers,
        following: response.following,
        publicRepos: response.public_repos,
      };
    } catch(error) {
      console.error("Failed to retrieve GitHub user data!");
      throw error;
    }

    // Create or update the data into database
    await this.createOrUpdateData(db, structedData);

    // If successfully inserted, return the structured data
    return structedData;
  }
}
