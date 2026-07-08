import jwt, { SignOptions } from "jsonwebtoken";

import { ENV } from "../constants/env.js";

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
}

export interface EmailVerificationPayload {
  userId: string;
  email: string;
}

export interface PasswordResetPayload {
  userId: string;
  email: string;
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

export function generateEmailVerificationToken(
  payload: EmailVerificationPayload
): string {
  const options: SignOptions = {
    expiresIn:
      ENV.EMAIL_VERIFICATION_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(
    payload,
    ENV.EMAIL_VERIFICATION_SECRET,
    options
  );
}

export function generatePasswordResetToken(
  payload: PasswordResetPayload
): string {
  const options: SignOptions = {
    expiresIn:
      ENV.PASSWORD_RESET_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(
    payload,
    ENV.PASSWORD_RESET_SECRET,
    options
  );
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

export function verifyEmailVerificationToken(
  token: string
): EmailVerificationPayload {
  return jwt.verify(
    token,
    ENV.EMAIL_VERIFICATION_SECRET
  ) as EmailVerificationPayload;
}

export function verifyPasswordResetToken(
  token: string
): PasswordResetPayload {
  return jwt.verify(
    token,
    ENV.PASSWORD_RESET_SECRET
  ) as PasswordResetPayload;
}