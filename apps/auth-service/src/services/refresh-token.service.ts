import { getRefreshTokenExpiry } from "../utils/date.js";
import {
  findRefreshToken,
  revokeRefreshTokenById,
  saveRefreshToken,
} from "../repositories/user.repository.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export async function refreshTokenService(
  refreshToken: string
) {
  // Verify Refresh Token JWT
  const payload = verifyRefreshToken(refreshToken);

  // Find Token in Database
  const storedToken = await findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new Error("Refresh token not found");
  }

  // Already Revoked
  if (storedToken.revoked) {
    throw new Error("Refresh token revoked");
  }

  // Expired
  if (storedToken.expiresAt < new Date()) {
    throw new Error("Refresh token expired");
  }

  // Revoke Old Refresh Token
  await revokeRefreshTokenById(storedToken.id);

  // Generate New Tokens
  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    username: payload.username,
    email: payload.email,
  });

  const newRefreshToken = generateRefreshToken({
    userId: payload.userId,
    username: payload.username,
    email: payload.email,
  });

  // Expiry
  const expiresAt = getRefreshTokenExpiry();

  // Save New Refresh Token
  await saveRefreshToken({
    token: newRefreshToken,
    userId: payload.userId,
    expiresAt,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}