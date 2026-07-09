import { Request, Response } from "express";

import { forgotPasswordService } from "../services/forgot-password.service.js";
import { forgotPasswordSchema } from "../validators/forgot-password.validator.js";

export async function forgotPasswordController(
  req: Request,
  res: Response
) {
  try {
    // Validate Request
    const data = forgotPasswordSchema.parse(req.body);

    // Call Service
    const result = await forgotPasswordService(data.email);

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