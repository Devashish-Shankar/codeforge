import { env } from "./env.js";

export const config = {
  server: {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  },

  database: {
    url: env.DATABASE_URL,
  },

  redis: {
    url: env.REDIS_URL,
  },

  jwt: {
    secret: env.JWT_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
  },
};