import { Request, Response } from "express";

import { resetPasswordService } from "../services/reset-password.service.js";
import { resetPasswordSchema } from "../validators/reset-password.validator.js";

export async function resetPasswordController(
  req: Request,
  res: Response
) {
  const data = resetPasswordSchema.parse(req.body);

  const result = await resetPasswordService(
    data.token,
    data.password
  );

  return res.status(200).json({
    success: true,
    data: result,
  });
}