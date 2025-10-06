/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_DATA_COLLECTOR_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
