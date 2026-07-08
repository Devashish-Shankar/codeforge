import { Request, Response } from "express";

import { emailVerificationService } from "../services/email-verification.service.js";

export async function emailVerificationController(
  req: Request,
  res: Response
) {
  try {
    const token = req.query.token as string;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    const result = await emailVerificationService(token);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}