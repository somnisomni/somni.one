import type { TechStack } from "$/lib/utils/tech-stacks";

export interface MeDataBase {
  id: string;
  title: string;
  desc?: string;
}

export interface MeProjectDataBase extends MeDataBase {
  stacks: TechStack[];
  yearFrom: number;
  yearTo?: number;
  details: string[];
  status: "ONGOING" | "MAINTAINING" | "COMPLETED" | "DISCONTINUED";
  repositoryUrl?: string;
  pageUrl?: string;
  appUrl?: string;
}

export interface MeContributionDataBase extends MeDataBase {
  repositoryUrl: string;
}

export type MeProjectIndividualData = MeProjectDataBase;

export interface MeProjectTeamData extends MeProjectDataBase {
  association: string;
  teamName: string;
  charge: string;
  prizes?: string[];
}

export interface MeContributionTranslationData extends MeContributionDataBase {
  category: string;
  langFrom: string | string[];
  langTo: string | string[];
  platform: "github" | "crowdin" | "weblate";
  githubPullRequests?: number[];
  directCommits?: string[];
}

export interface MeContributionOpenSourceData extends MeContributionDataBase {
  contributions: Array<{
    desc: string;
    pullRequest?: number;
    directCommit?: string;
  }>;
}
