import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}