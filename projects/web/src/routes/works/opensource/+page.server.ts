import type { PageServerLoad } from "./$types";
import type { ContributionOpenSourceData } from "@somni.one/common";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const data = [ ...(await import("@somni.one/common/data/works/contributions_opensource.json")).default as ContributionOpenSourceData[] ];

  // Sort by title in alphabetical order
  data.sort((a, b) => a.title.localeCompare(b.title));

  // Return data
  return { data };
};
