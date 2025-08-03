import type { PageServerLoad } from "./$types";
import type { ProjectIndividualData } from "@somni.one/common";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const data = [ ...(await import("@somni.one/common/data/works/projects_individual.json")).default as ProjectIndividualData[] ];

  // Sort by project start year (`yearFrom`)
  data.sort((a, b) => b.yearFrom - a.yearFrom);

  // Return data
  return { data };
};
