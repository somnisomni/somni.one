import type { WorkDataBase } from ".";

export interface ContributionDataBase extends WorkDataBase {
  proofUrl?: string;
  contributions: Array<{
    desc?: string;
  } & ({
    type: "pull-request";
    pullRequest: number;
  } | {
    type: "direct-commit";
    directCommit: string;
  })>;
}

export interface ContributionTranslationData extends ContributionDataBase {
  category: string;
  langFrom: string[];
  langTo: string[];
  platform: "github" | "crowdin" | "weblate" | "transifex" | "direct";
}

export type ContributionOpenSourceData = ContributionDataBase;
