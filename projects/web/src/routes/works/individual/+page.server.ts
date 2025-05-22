import type { MeProjectIndividualData } from "$/lib/typings/me-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const data = [ ...(await import("@somni.one/common/data/works/projects_individual.json")).default as MeProjectIndividualData[] ];

  // Sort by project start year (`yearFrom`)
  data.sort((a, b) => b.yearFrom - a.yearFrom);

  // Return data
  return { data };
};
