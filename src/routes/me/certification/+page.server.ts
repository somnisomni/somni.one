import type { MeCertificationData } from "$/lib/typings/me-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    data: [
      ...(await import("$lib/server/data/certifications.json")).default as MeCertificationData[],
    ],
  };
};
