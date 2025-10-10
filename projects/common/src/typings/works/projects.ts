import type { TechStack, WorkDataBase } from ".";

export interface ProjectDataBase extends WorkDataBase {
  repositoryUrl?: string;
  yearFrom: number;
  yearTo?: number;
  details: string[];
  status: "ongoing" | "maintaining" | "completed" | "discontinued";
  pageUrl?: string;
  appUrl?: string;
  headerImageRemotePaths?: string[];
  stacks: TechStack[];
}

export type ProjectIndividualData = ProjectDataBase;

export interface ProjectTeamData extends ProjectDataBase {
  association: string;
  teamName: string;
  charge: string;
  prizes?: string[];
}
