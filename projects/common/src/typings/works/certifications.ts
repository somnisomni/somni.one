import type { WorkDataBase } from ".";

export interface CertificationData extends WorkDataBase {
  type: "language" | "tech-skill";
  certificationYear?: number;
  subCertifications: Array<{
    title: string;
    certificationYear: number;
  }>;
}
