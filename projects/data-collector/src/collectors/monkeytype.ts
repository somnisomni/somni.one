import type { PrismaClient } from "../generated/prisma-client/client";
import type { MonkeytypeUserData } from "@somni.one/common";
import { DataType } from "../generated/prisma-client/enums";
import { createMonkeytypeAPI } from "../lib/monkeytype";
import DataCollectorBase from "./base";

export default class MonkeytypeUserDataCollector extends DataCollectorBase<MonkeytypeUserData> {
  public override readonly recollectMinimumPeriod = 60 * 60 * 1; // 1 hour
  public override readonly dataType: DataType = DataType.MonkeytypeUser;

  public get dataId(): string {
    return "monkeytype/user";
  }

  public async collect(db: PrismaClient): Promise<MonkeytypeUserData> {
    // Create Monkeytype API instance
    const api = createMonkeytypeAPI();
    if(!api) {
      throw new Error("Failed to create Monkeytype API instance.");
    }

    let structedData: MonkeytypeUserData;
    try {
      // Get last result data of APE user
      const lastResult = await api.getLastResult();

      // Check for errors
      if(typeof lastResult === "number") {
        throw new Error("One or more Monkeytype API requests failed.");
      }

      // Struct data
      structedData = {
        name: lastResult.data.name,
        lastResult: {
          wpm: lastResult.data.wpm,
          rawWpm: lastResult.data.rawWpm,
          acc: lastResult.data.acc,
          testDuration: lastResult.data.testDuration,
          consistency: lastResult.data.consistency,
          language: lastResult.data.language,
          timestamp: lastResult.data.timestamp,
        },
      };
    } catch(error) {
      console.error("Failed to retrieve Monkeytype user data!");
      throw error;
    }

    // Create or update the data into database
    await this.createOrUpdateData(db, structedData);

    // If successfully inserted, return the structured data
    return structedData;
  }
}
