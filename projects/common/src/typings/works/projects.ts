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
  repositoryUrl?: string;
  yearFrom: number;
  yearTo?: number;
  details: string[];
  status: "ongoing" | "maintaining" | "completed" | "discontinued";
  pageUrl?: string;
  appUrl?: string;
  headerImageRemoteSrcSet?: ImageSrcSet[];
  stacks: TechStack[];
  prizes?: string[];
  featured: boolean;

  // Optional team data; if absent, it's an individual project
  teamData?: ProjectTeamData;
}
