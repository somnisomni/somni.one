import type { PageServerLoad } from "./$types";
import type { ProjectTeamData } from "@somni.one/common";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const data = [ ...(await import("@somni.one/common/data/works/projects_team.json")).default as ProjectTeamData[] ];

  // Sort by project start year (`yearFrom`)
  data.sort((a, b) => b.yearFrom - a.yearFrom);

  // Return data
  return { data };
};
