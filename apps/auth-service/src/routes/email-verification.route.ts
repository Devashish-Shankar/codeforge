import { Router } from "express";

import { emailVerificationController } from "../controllers/email-verification.controller.js";

const router = Router();

/**
 * Verify Email
 */
router.get(
  "/verify-email",
  emailVerificationController
);

export default router;