import type { PageServerLoad } from "./$types";
import type { CertificationData } from "@somni.one/common";

export const load: PageServerLoad = async () => {
  // Load data from JSON
  const data = [ ...(await import("@somni.one/common/data/works/certifications.json")).default as CertificationData[] ];

  // Sort by certification year (or sub-certification year if no certification year)
  data.sort((a, b) => {
    const aYear = a.certificationYear ? a.certificationYear : (a.subCertifications ? a.subCertifications.sort((subA, subB) => subB.certificationYear - subA.certificationYear)[0].certificationYear : 0);
    const bYear = b.certificationYear ? b.certificationYear : (b.subCertifications ? b.subCertifications.sort((subA, subB) => subB.certificationYear - subA.certificationYear)[0].certificationYear : 0);
    return bYear - aYear;
  });

  // Return data
  return { data };
};
