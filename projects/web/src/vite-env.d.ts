/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_DATA_COLLECTOR_URL: string;
  readonly VITE_REMOTE_ASSETS_HOST_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
