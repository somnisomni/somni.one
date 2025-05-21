import type { MeContributionOpenSourceData } from "$/lib/typings/me-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const data = [ ...(await import("$lib/server/data/contributions_opensource.json")).default as MeContributionOpenSourceData[] ];

  // Sort by title in alphabetical order
  data.sort((a, b) => a.title.localeCompare(b.title));

  // Return data
  return { data };
};
