import { Router } from "express";

import { refreshTokenController } from "../controllers/refresh-token.controller.js";

const router = Router();

router.post("/refresh", refreshTokenController);

export default router;