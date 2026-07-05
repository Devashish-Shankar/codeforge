import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(4000),

  JWT_SECRET: z.string().min(1),

  JWT_EXPIRES_IN: z.string().default("15m"),

  REFRESH_TOKEN_SECRET: z.string().min(1),

  REFRESH_TOKEN_EXPIRES_IN: z.string().default("7d"),
});

export const ENV = envSchema.parse(process.env);