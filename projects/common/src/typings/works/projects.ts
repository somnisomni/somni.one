import type { TechStack, WorkDataBase } from ".";

export interface ImageSrcSet {
  path: string;
  scale: number;
}

export interface ProjectDataBase extends WorkDataBase {
  repositoryUrl?: string;
  yearFrom: number;
  yearTo?: number;
  details: string[];
  status: "ongoing" | "maintaining" | "completed" | "discontinued";
  pageUrl?: string;
  appUrl?: string;
  headerImageRemoteSrcSet?: ImageSrcSet[];
  stacks: TechStack[];
  featured: boolean;
}

export type ProjectIndividualData = ProjectDataBase;

export interface ProjectTeamData extends ProjectDataBase {
  association: string;
  teamName: string;
  charge: string;
  prizes?: string[];
}
