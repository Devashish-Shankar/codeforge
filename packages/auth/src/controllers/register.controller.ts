import { Request, Response } from "express";

import { registerService } from "../services/register.service.js";
import { registerSchema } from "../validators/register.validator.js";

export async function registerController(
  req: Request,
  res: Response
) {
  try {
    const data = registerSchema.parse(req.body);

    const user = await registerService(data);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
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