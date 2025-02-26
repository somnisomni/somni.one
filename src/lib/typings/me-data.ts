import type { TechStack } from "$/lib/utils/tech-stacks";

export enum MeDataType {
  PROJECT_INDIVIDUAL = "projects_individual",
  PROJECT_TEAM = "projects_team",
  CONTRIBUTION_TRANSLATION = "contributions_translation",
  CONTRIBUTION_OPENSOURCE = "contributions_opensource",
  CERTIFICATION = "certifications",
}

export interface MeDataBase {
  id: string;
  title: string;
  desc?: string;
  repositoryUrl?: string;
}

export interface MeProjectDataBase extends MeDataBase {
  repositoryUrl: string;  // mandatory

  stacks: TechStack[];
  yearFrom: number;
  yearTo?: number;
  details: string[];
  status: "ONGOING" | "MAINTAINING" | "COMPLETED" | "DISCONTINUED";
  pageUrl?: string;
  appUrl?: string;
}

export interface MeContributionDataBase extends MeDataBase {
  proofUrl?: string;
}

export type MeProjectIndividualData = MeProjectDataBase;

export interface MeProjectTeamData extends MeProjectDataBase {
  association: string;
  teamName: string;
  charge: string;
  prizes?: string[];
}

export type MeContributionTranslationData = MeContributionDataBase
  & {
    category: string;
    langFrom: string | string[];
    langTo: string | string[];
  } & ({
    platform: "github";
    githubPullRequests: number[];
    directCommits: string[];
  } | {
    platform: "crowdin" | "weblate" | "transifex";
  });

export interface MeContributionOpenSourceData extends MeContributionDataBase {
  contributions: Array<{
    desc: string;
    pullRequest?: number;
    directCommit?: string;
  }>;
}

export interface MeCertificationData extends MeDataBase {
  type: "language" | "tech-skill";
  certificationYear?: number;
  subCertifications: Array<{
    title: string;
    certificationYear: number;
  }>;
}
