// src/zod-env.ts
import { z } from "zod";

const envSchema = z.object({
  VITE_BASE_URL_TESTE: z.string().url(),
  VITE_CONSUMER_KEY: z.string().min(1),
  VITE_CONSUMER_SECRET: z.string().min(1),
  VITE_ACCESS_TOKEN: z.string().min(1),
  VITE_TOKEN_SECRET: z.string().min(1),
  VITE_ACCESS_TOKEN_TESTE: z.string().min(1),
  VITE_TOKEN_SECRET_TESTE: z.string().min(1),
});

export const env = envSchema.parse(import.meta.env);
