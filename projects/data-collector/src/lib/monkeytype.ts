import { BasicAPIFetch } from "./basic-fetch";

const API_BASE_URL = "https://api.monkeytype.com";
const API_ENDPOINT_PERSONAL_BEST = "/users/personalBests";
const API_ENDPOINT_LAST_RESULT = "/results/last";

export class MonkeytypeAPI extends BasicAPIFetch {
  public constructor(apeKey: string) {
    super(API_BASE_URL, {
      Authorization: `ApeKey ${apeKey}`,
    });
  }

  public async getPersonalBest(mode: "time" | "words" | "quote" | "custom" | "zen", value?: string | number): Promise<MonkeytypePersonalBestResponse | number> {
    const query = new URLSearchParams();
    query.set("mode", mode);
    if(value) {
      query.set("mode2", value.toString());
    }

    return this.get<MonkeytypePersonalBestResponse>(API_ENDPOINT_PERSONAL_BEST, query);
  }

  public async getLastResult(): Promise<MonkeytypeLastResultResponse | number> {
    return this.get<MonkeytypeLastResultResponse>(API_ENDPOINT_LAST_RESULT);
  }
}

export function createMonkeytypeAPI(): MonkeytypeAPI {
  if(!process.env.MONKEYTYPE_APE) {
    throw new Error("Monkeytype API key is not set in environment variables.");
  }

  return new MonkeytypeAPI(process.env.MONKEYTYPE_APE);
}

export interface MonkeytypeResponseBase {
  message: string;
}

export interface MonkeytypePersonalBestResponse extends MonkeytypeResponseBase {
  data: {
    acc: number;
    consistency: number;
    difficulty: string;
    lazyMode: boolean;
    language: string;
    punctuation: boolean;
    numbers: boolean;
    raw: number;
    wpm: number;
    timestamp: number;
  };
}

export interface MonkeytypeLastResultResponse extends MonkeytypeResponseBase {
  data: {
    wpm: number;
    rawWpm: number;
    acc: number;
    timestamp: number;
    testDuration: number;
    consistency: number;
    keyConsistency: number;
    language: string;
    difficulty: string;
    name: string;
  };
}
