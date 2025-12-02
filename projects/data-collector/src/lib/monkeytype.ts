export class MonkeytypeAPI {
  private static readonly API_HOST = "https://api.monkeytype.com";

  constructor(private apeKey?: string) { }

  private async get<TResponse = IMonkeytypeResponseBase>(path: string, query?: URLSearchParams): Promise<TResponse | number> {
    if(!this.apeKey) {
      throw new Error("Monkeytype APE key should be provided");
    }

    const normalizedPath = path.replace(/^\/+/, "");
    const url = new URL(`${MonkeytypeAPI.API_HOST}/${normalizedPath}`);
    if(query) {
      url.search = query.toString();
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `ApeKey ${this.apeKey}`,
      },
    });

    const json = await response.json() as IMonkeytypeResponseBase;

    if(!response.ok) {
      if(json.message) {
        console.error(`Monkeytype API request failed: ${response.status} ${response.statusText} (message: ${json.message})`);
      }

      return response.status;
    }

    return json as TResponse;
  }

  public async getPersonalBest(mode: "time" | "words" | "quote" | "custom" | "zen", value?: string | number): Promise<IMonkeytypePersonalBestResponse | number> {
    const query = new URLSearchParams();
    query.set("mode", mode);
    if(value) {
      query.set("mode2", value.toString());
    }

    return this.get<IMonkeytypePersonalBestResponse>("/users/personalBests", query);
  }

  public async getLastResult(): Promise<IMonkeytypeLastResultResponse | number> {
    return this.get<IMonkeytypeLastResultResponse>("/results/last");
  }
}

export function createMonkeytypeAPI(): MonkeytypeAPI {
  return new MonkeytypeAPI(process.env.MONKEYTYPE_APE);
}

export interface IMonkeytypeResponseBase {
  message: string;
}

export interface IMonkeytypePersonalBestResponse extends IMonkeytypeResponseBase {
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

export interface IMonkeytypeLastResultResponse extends IMonkeytypeResponseBase {
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
