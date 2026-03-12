import { BasicAPIFetch } from "./basic-fetch";

export class SolvedACAPI extends BasicAPIFetch {
  public constructor() {
    super("https://solved.ac/api/v3");
  }

  public async getUser(handle: string): Promise<SolvedACUserResponse | number> {
    return await this.get<SolvedACUserResponse>("/user/show", new URLSearchParams({ handle }));
  }
}

export function createSolvedACAPI(): SolvedACAPI {
  return new SolvedACAPI();
}

export interface SolvedACUserResponse {
  handle: string;
  solvedCount: number;
  tier: number;
  rating: number;
  rank: number;
}
