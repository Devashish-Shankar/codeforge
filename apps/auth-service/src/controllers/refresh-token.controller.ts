import { Request, Response } from "express";

import { refreshTokenService } from "../services/refresh-token.service.js";
import { refreshTokenSchema } from "../validators/refresh-token.validator.js";

export async function refreshTokenController(
  req: Request,
  res: Response
) {
  const data = refreshTokenSchema.parse(req.body);

  const result = await refreshTokenService(data.refreshToken);

  return res.status(200).json({
    success: true,
    data: result,
  });
}