import {
  findUserByEmail,
  savePasswordResetToken,
} from "../repositories/user.repository.js";

import { getPasswordResetExpiry } from "../utils/date.js";
import { generatePasswordResetToken } from "../utils/jwt.js";

import { ENV } from "../constants/env.js";

export async function forgotPasswordService(
  email: string
) {
  // Check user
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  // Generate reset token
  const resetToken = generatePasswordResetToken({
    userId: user.id,
    email: user.email,
  });

  // Calculate expiry
  const expiresAt = getPasswordResetExpiry();

  // Save token
  await savePasswordResetToken({
    token: resetToken,
    userId: user.id,
    expiresAt,
  });

  // Temporary (SMTP integration later)
  return {
    message: "Password reset link generated successfully",
    resetLink: `http://localhost:${ENV.PORT}/auth/reset-password?token=${resetToken}`,
  };
}