import { ENV } from "../constants/env.js";

/**
 * Returns refresh token expiry date
 * based on REFRESH_TOKEN_EXPIRES_IN
 *
 * Supported:
 * 7d
 * 14d
 * 30d
 */
export function getRefreshTokenExpiry(): Date {
  const expiresAt = new Date();

  const value = ENV.REFRESH_TOKEN_EXPIRES_IN;

  if (value.endsWith("d")) {
    const days = Number(value.slice(0, -1));

    expiresAt.setDate(expiresAt.getDate() + days);

    return expiresAt;
  }

  throw new Error(
    `Unsupported refresh token expiry: ${value}`
  );
}

/**
 * Returns email verification expiry date
 * based on EMAIL_VERIFICATION_EXPIRES_IN
 *
 * Supported:
 * 24h
 * 48h
 * 72h
 */
export function getEmailVerificationExpiry(): Date {
  const expiresAt = new Date();

  const value = ENV.EMAIL_VERIFICATION_EXPIRES_IN;

  if (value.endsWith("h")) {
    const hours = Number(value.slice(0, -1));

    expiresAt.setHours(expiresAt.getHours() + hours);

    return expiresAt;
  }

  throw new Error(
    `Unsupported email verification expiry: ${value}`
  );
}

/**
 * Returns password reset expiry date
 * based on PASSWORD_RESET_EXPIRES_IN
 *
 * Supported:
 * 15m
 * 30m
 * 60m
 */
export function getPasswordResetExpiry(): Date {
  const expiresAt = new Date();

  const value = ENV.PASSWORD_RESET_EXPIRES_IN;

  if (value.endsWith("m")) {
    const minutes = Number(value.slice(0, -1));

    expiresAt.setMinutes(
      expiresAt.getMinutes() + minutes
    );

    return expiresAt;
  }

  throw new Error(
    `Unsupported password reset expiry: ${value}`
  );
}