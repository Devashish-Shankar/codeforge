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

  EMAIL_VERIFICATION_SECRET: z.string().min(1),

  EMAIL_VERIFICATION_EXPIRES_IN: z.string().default("24h"),

  PASSWORD_RESET_SECRET: z.string().min(1),

  PASSWORD_RESET_EXPIRES_IN: z.string().default("15m"),
});

export const ENV = envSchema.parse(process.env);