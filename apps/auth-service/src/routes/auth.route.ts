import { Router } from "express";
import registerRouter from "./register.route.js";
import loginRouter from "./login.route.js";
import meRouter from "./me.route.js";
import logoutRouter from "./logout.route.js";
import refreshTokenRouter from "./refresh-token.route.js";
import emailVerificationRouter from "./email-verification.route.js";
const router = Router();
/**
 * Register Routes
 */
router.use(registerRouter);
/**
 * Login Routes
 */
router.use(loginRouter);
/**
 * Me Routes
 */
router.use(meRouter);
/**
 * Logout Routes
 */
router.use(logoutRouter);
/**
 * Refresh Token Routes
 */
router.use(refreshTokenRouter);
/**
 * Email Verification Routes
 */
router.use(emailVerificationRouter);
export default router;