import { Response } from "express";
import {AuthRequest} from "../middleware/auth.middleware.js";

import {
  logoutService,
  logoutAllService,
} from "../services/logout.service.js";

import { logoutSchema } from "../validators/logout.validator.js";

export async function logoutController(
  req: AuthRequest,
  res: Response
) {
  const data = logoutSchema.parse(req.body);

  const result = await logoutService(data.refreshToken);

  return res.status(200).json({
    success: true,
    data: result,
  });
}

export async function logoutAllController(
  req: AuthRequest,
  res: Response
) {
  const userId = req.user!.userId;

  const result = await logoutAllService(userId);

  return res.status(200).json({
    success: true,
    data: result,
  });
}