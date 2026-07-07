import { Router } from "express";

import {
  logoutController,
  logoutAllController,
} from "../controllers/logout.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Logout Current Device
 */
router.post("/logout", logoutController);

/**
 * Logout All Devices
 */
router.post(
  "/logout-all",
  authMiddleware,
  logoutAllController
);

export default router;