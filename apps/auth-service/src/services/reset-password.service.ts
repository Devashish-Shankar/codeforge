import {
  findPasswordResetToken,
  updateUserPassword,
  deletePasswordResetToken,
} from "../repositories/user.repository.js";

import { verifyPasswordResetToken } from "../utils/jwt.js";
import { hashPassword } from "../utils/password.js";

export async function resetPasswordService(
  token: string,
  password: string
) {
  // Verify JWT
  const payload = verifyPasswordResetToken(token);

  // Find token in database
  const storedToken = await findPasswordResetToken(token);

  if (!storedToken) {
    throw new Error("Password reset token not found");
  }

  // Check expiry
  if (storedToken.expiresAt < new Date()) {
    throw new Error("Password reset token expired");
  }

  // Hash new password
  const hashedPassword = await hashPassword(password);

  // Update password
  await updateUserPassword(
    payload.userId,
    hashedPassword
  );

  // Delete used token
  await deletePasswordResetToken(token);

  return {
    message: "Password reset successfully",
  };
}