import jwt, { SignOptions } from "jsonwebtoken";

import { ENV } from "../constants/env.js";

export interface JwtPayload {
  userId: string;
}

export function generateAccessToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: ENV.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, ENV.JWT_SECRET, options);
}

export function generateRefreshToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: ENV.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, options);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(
    token,
    ENV.REFRESH_TOKEN_SECRET
  ) as JwtPayload;
}