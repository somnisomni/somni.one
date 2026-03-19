import { BasicAPIFetch } from "./basic-fetch";

const API_BASE_URL = "https://solved.ac/api/v3";
const API_ENDPOINT_USER = "/user/show";

export class SolvedACAPI extends BasicAPIFetch {
  public constructor() {
    super(API_BASE_URL);
  }

  public async getUser(handle: string): Promise<SolvedACUserResponse | number> {
    return await this.get<SolvedACUserResponse>(API_ENDPOINT_USER, new URLSearchParams({ handle }));
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
