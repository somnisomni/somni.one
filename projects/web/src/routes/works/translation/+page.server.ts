import type { MeContributionTranslationData } from "$/lib/typings/me-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const data = [ ...(await import("@somni.one/common/data/works/contributions_translation.json")).default as MeContributionTranslationData[] ];

  // Sort by title in alphabetical order
  data.sort((a, b) => a.title.localeCompare(b.title));

  // Return data
  return { data };
};
