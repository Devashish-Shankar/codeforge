import { Request, Response } from "express";

import { forgotPasswordService } from "../services/forgot-password.service.js";
import { forgotPasswordSchema } from "../validators/forgot-password.validator.js";

export async function forgotPasswordController(
  req: Request,
  res: Response
) {
  const data = forgotPasswordSchema.parse(req.body);

  const result = await forgotPasswordService(
    data.email
  );

  return res.status(200).json({
    success: true,
    data: result,
  });
}