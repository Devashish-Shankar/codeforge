import { Router } from "express";

import { resetPasswordController } from "../controllers/reset-password.controller.js";

const router = Router();

/**
 * Reset Password
 */
router.post(
  "/reset-password",
  resetPasswordController
);

export default router;