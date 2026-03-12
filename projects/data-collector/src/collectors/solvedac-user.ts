import type { PrismaClient } from "../generated/prisma-client/client";
import type { SolvedACUserData } from "@somni.one/common";
import { generateSolvedACUserId } from "@somni.one/common";
import { DataType } from "../generated/prisma-client/enums";
import { createSolvedACAPI } from "../lib/solvedac";
import DataCollectorBase from "./base";

export default class SolvedACUserDataCollector extends DataCollectorBase<SolvedACUserData> {
  constructor(
    private readonly handle: string,
  ) { super(); }

  public override readonly recollectMinimumPeriod = 60 * 60 * 24; // 24 hours (1 day)
  public override readonly dataType: DataType = DataType.SolvedACUser;

  public get dataId(): string {
    return generateSolvedACUserId(this.handle);
  }

  public async collect(db: PrismaClient): Promise<SolvedACUserData> {
    // Create solved.ac API instance
    const api = createSolvedACAPI();
    if(!api) {
      throw new Error("Failed to create solved.ac API instance.");
    }

    let structedData: SolvedACUserData;
    try {
      // Get user data
      const response = await api.getUser(this.handle);

      // Check for errors
      if(typeof response === "number") {
        throw new Error(`solved.ac API request failed with status code: ${response}`);
      }

      // Struct data
      structedData = {
        handle: response.handle,
        solvedCount: response.solvedCount,
        rating: response.rating,
        rank: response.rank,
        ...this.resolveTier(response.tier),
      };
    } catch(error) {
      console.error("Failed to retrieve solved.ac user data!");
      throw error;
    }

    // Create or update the data into database
    await this.createOrUpdateData(db, structedData);

    // If successfully inserted, return the structured data
    return structedData;
  }

  private resolveTier(rawTier: number): Pick<SolvedACUserData, "tierName" | "tierLevel"> {
    if(rawTier <= 0) {
      return { tierName: "Unrated", tierLevel: 0 };
    } else if(rawTier <= 5) {
      return { tierName: "Bronze", tierLevel: rawTier };
    } else if(rawTier <= 10) {
      return { tierName: "Silver", tierLevel: rawTier - 5 };
    } else if(rawTier <= 15) {
      return { tierName: "Gold", tierLevel: rawTier - 10 };
    } else if(rawTier <= 20) {
      return { tierName: "Platinum", tierLevel: rawTier - 15 };
    } else if(rawTier <= 25) {
      return { tierName: "Diamond", tierLevel: rawTier - 20 };
    } else if(rawTier <= 30) {
      return { tierName: "Ruby", tierLevel: rawTier - 25 };
    } else {
      return { tierName: "Master", tierLevel: rawTier - 30 };
    }
  }
}
