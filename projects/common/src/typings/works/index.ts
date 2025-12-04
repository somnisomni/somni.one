export interface WorkDataBase {
  id: string;
  title: string;
  desc?: string;
}

export * from "./certifications";
export * from "./contributions";
export * from "./projects";
export * from "./tech-stacks";

//#region JSON Schema Exports
import type { ProjectData } from "./projects";
import type { ContributionOpenSourceData, ContributionTranslationData } from "./contributions";

/** @deprecated This is for JSON schema generation. Do not use in production code. */
export type ProjectDataSchema = ProjectData[];

/** @deprecated This is for JSON schema generation. Do not use in production code. */
export type ContributionTranslationDataSchema = ContributionTranslationData[];

/** @deprecated This is for JSON schema generation. Do not use in production code. */
export type ContributionOpenSourceDataSchema = ContributionOpenSourceData[];
//#endregion
