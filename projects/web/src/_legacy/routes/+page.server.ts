import type { LinkCategory } from "$/_legacy/lib/typings/link";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const linkData = [ ...(await import("$/_legacy/lib/data/links.json")).default as LinkCategory[] ];

  // Return data
  return { linkData };
};
