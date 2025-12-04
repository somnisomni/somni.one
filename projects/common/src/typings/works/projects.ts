import type { TechStack, WorkDataBase } from ".";

export interface ImageSrcSet {
  path: string;
  scale: number;
}

export interface ProjectTeamData {
  teamName: string;
  charge: string;
}

export interface ProjectData extends WorkDataBase {
  association?: string;
  yearFrom: number;
  yearTo?: number;
  details: string[];
  status: "ongoing" | "maintaining" | "completed" | "discontinued";
  repositoryUrl?: string;
  pageUrl?: string;
  appUrl?: string;
  stacks: TechStack[];
  prizes?: string[];
  featured: boolean;
  headerImageRemoteSrcSet?: ImageSrcSet[];

  // Optional team data; if absent, it's an individual project
  teamData?: ProjectTeamData;
}
