import type { MeContributionTranslationData } from "$/lib/typings/me-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    data: [
      ...(await import("$lib/server/data/contributions_translation.json")).default as MeContributionTranslationData[],
    ],
  };
};
