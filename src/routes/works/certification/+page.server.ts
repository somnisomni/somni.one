import type { MeCertificationData } from "$/lib/typings/me-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const data = [ ...(await import("$lib/server/data/certifications.json")).default as MeCertificationData[] ];

  // Sort by certification year (or sub-certification year if no certification year)
  data.sort((a, b) => {
    const aYear = a.certificationYear ? a.certificationYear : (a.subCertifications ? a.subCertifications.sort((subA, subB) => subB.certificationYear - subA.certificationYear)[0].certificationYear : 0);
    const bYear = b.certificationYear ? b.certificationYear : (b.subCertifications ? b.subCertifications.sort((subA, subB) => subB.certificationYear - subA.certificationYear)[0].certificationYear : 0);
    return bYear - aYear;
  });

  // Return data
  return { data };
};
