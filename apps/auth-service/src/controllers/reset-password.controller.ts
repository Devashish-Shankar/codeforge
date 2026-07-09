import { Request, Response } from "express";

import { resetPasswordService } from "../services/reset-password.service.js";
import { resetPasswordSchema } from "../validators/reset-password.validator.js";

export async function resetPasswordController(
  req: Request,
  res: Response
) {
  try {
    // Validate Request
    const data = resetPasswordSchema.parse(req.body);

    // Call Service
    const result = await resetPasswordService(
      data.token,
      data.password
    );

    // Success Response
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}