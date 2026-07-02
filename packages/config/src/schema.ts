import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DATABASE_URL: z.string(),

  REDIS_URL: z.string(),

  JWT_SECRET: z.string(),

  JWT_REFRESH_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;