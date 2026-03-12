// reference: https://solved.ac/api/v3/user/show?handle=sdskykloud
// reference: https://help.solved.ac/ko/stats/ac-rating

export type SolvedACTier = "Unrated" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Ruby" | "Master";

export interface SolvedACUserData {
  handle: string;
  solvedCount: number;
  tierName: SolvedACTier;
  tierLevel: number;
  rating: number;
  rank: number;
}
