/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_URL_TESTE: string;
  readonly VITE_CONSUMER_KEY: string;
  readonly VITE_CONSUMER_SECRET: string;
  readonly VITE_ACCESS_TOKEN: string;
  readonly VITE_TOKEN_SECRET: string;
  readonly VITE_ACCESS_TOKEN_TESTE: string;
  readonly VITE_TOKEN_SECRET_TESTE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
