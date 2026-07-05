import { Router } from "express";

import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, (req: AuthRequest, res) => {
  return res.status(200).json({
    success: true,
    message: "Authenticated user",
    data: req.user,
  });
});

export default router;