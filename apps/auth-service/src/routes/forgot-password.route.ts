import { Router } from "express";

import { forgotPasswordController } from "../controllers/forgot-password.controller.js";

const router = Router();

/**
 * Forgot Password
 */
router.post(
  "/forgot-password",
  forgotPasswordController
);

export default router;