import type { MeProjectTeamData } from "$/lib/typings/me-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    data: [
      ...(await import("$lib/server/data/projects_team.json")).default as MeProjectTeamData[],
    ],
  };
};
