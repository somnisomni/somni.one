import type { WorkDataBase } from ".";

export interface ContributionDataBase extends WorkDataBase {
  repositoryUrl?: string;
  proofUrl?: string;
  contributions?: Array<{
    desc?: string;
  } & ({
    type: "pull-request";
    pr: number;
  } | {
    type: "direct-commit";
    commit: string;
  })>;
}

export interface ContributionTranslationData extends ContributionDataBase {
  langFromTo: { from: string; to: string }[];
  platform: "github" | "crowdin" | "weblate" | "transifex" | "direct";
}

export type ContributionOpenSourceData = ContributionDataBase;
