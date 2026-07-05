import express from "express";
import helmet from "helmet";

import healthRouter from "./health/health.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

/**
 * Security Middleware
 */
app.use(helmet());

/**
 * Body Parser
 */
app.use(express.json());

/**
 * Health Routes
 */
app.use("/health", healthRouter);

/**
 * Authentication Routes
 */
app.use("/auth", authRouter);

export default app;