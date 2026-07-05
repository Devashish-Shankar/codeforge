import { Router } from "express";
import registerRouter from "./register.route.js";
import loginRouter from "./login.route.js";
import meRouter from "./me.route.js";
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
export default router;