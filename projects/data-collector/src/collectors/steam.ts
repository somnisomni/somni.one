import type { PrismaClient } from "@prisma/client";
import type { SteamUserData } from "@somni.one/common";
import type SteamAPI from "steamapi";
import { DataType } from "@prisma/client";
import { generateSteamUserId } from "@somni.one/common";
import { createSteamAPI } from "../lib/steam";
import DataCollectorBase from "./base";

export default class SteamDataCollector extends DataCollectorBase<SteamUserData> {
  constructor(
    private readonly userName: string,
  ) { super(); }

  public override readonly recollectMinimumPeriod = 60 * 60 * 4; // 4 hours
  public override readonly dataType: DataType = DataType.SteamUser;

  public get dataId(): string {
    return generateSteamUserId(this.userName);
  }

  public async collect(db: PrismaClient): Promise<SteamUserData> {
    // Create Steam API instance
    const api = createSteamAPI();
    if(!api) {
      throw new Error("Failed to create Steam API instance.");
    }

    // Resolve user ID from username
    const userId = await this.resolveUserId(api);
    if(!userId) {
      throw new Error("Failed to resolve Steam user ID.");
    }

    let structedData: SteamUserData;
    try {
      // Get user summary and recent game data of user
      const userSummary = await api.getUserSummary(userId);
      const userRecentGame = (await api.getUserRecentGames(userId, 1))[0];

      // Struct data
      structedData = {
        nickname: userSummary.nickname,
        profileUrl: userSummary.profileURL,
        lastPlayedGame: userRecentGame ? {   // eslint-disable-line @stylistic/multiline-ternary
          name: userRecentGame.game.name,
          appUrl: `https://store.steampowered.com/app/${userRecentGame.game.id}`,
          totalPlayTimeMinutes: userRecentGame.minutes,
        } : null,
      };
    } catch(error) {
      console.error("Failed to retrieve Steam user data!");
      throw error;
    }

    // Create or update the data into database
    await this.createOrUpdateData(db, structedData);

    // If successfully inserted, return the structured data
    return structedData;
  }

  private async resolveUserId(steam: SteamAPI): Promise<string | null> {
    return (await steam.resolve(this.userName)) ?? null;
  }
}
