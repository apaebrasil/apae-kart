// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    CONSUMER_KEY: string;
    CONSUMER_SECRET: string;
    ACCESS_TOKEN: string;
    TOKEN_SECRET: string;
    BASE_URL: string;
  }
}
