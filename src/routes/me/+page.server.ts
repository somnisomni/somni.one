import type { MeContributionOpenSourceData, MeContributionTranslationData, MeProjectIndividualData, MeProjectTeamData } from "$/lib/typings/me-data";
import type { PageServerLoad } from "./$types";

export type MeData = {
  contribOpenSource: MeContributionOpenSourceData[];
  contribTranslation: MeContributionTranslationData[];
  projectsIndividual: MeProjectIndividualData[];
  projectsTeam: MeProjectTeamData[];
};

export const load: PageServerLoad = async () => ({
  contribOpenSource: (await import("$lib/server/data/contributions_opensource.json")).default,
  contribTranslation: (await import("$lib/server/data/contributions_translation.json")).default,
  projectsIndividual: (await import("$lib/server/data/projects_individual.json")).default,
  projectsTeam: (await import("$lib/server/data/projects_team.json")).default,
} as MeData);
