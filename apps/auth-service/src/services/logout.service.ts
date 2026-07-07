import {
  findRefreshToken,
  revokeRefreshTokenById,
} from "../repositories/user.repository.js";

import { deleteUserRefreshTokens } from "../repositories/user.repository.js";
export async function logoutService(
  refreshToken: string
) {
  const storedToken = await findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new Error("Refresh token not found");
  }

  if (storedToken.revoked) {
    throw new Error("Refresh token already revoked");
  }

  await revokeRefreshTokenById(storedToken.id);

  return {
    message: "Logged out successfully",
  };
}

export async function logoutAllService(
  userId: string
) {
  await deleteUserRefreshTokens(userId);

  return {
    message: "Logged out from all devices",
  };
}