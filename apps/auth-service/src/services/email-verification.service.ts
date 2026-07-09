import {
  findEmailVerificationToken,
  verifyUserEmail,
  deleteEmailVerificationToken,
} from "../repositories/user.repository.js";

import { verifyEmailVerificationToken } from "../utils/jwt.js";

export async function emailVerificationService(
  token: string
) {
  // Verify JWT
  const payload = verifyEmailVerificationToken(token);

  // Find token in database
  const storedToken =
    await findEmailVerificationToken(token);

  if (!storedToken) {
    throw new Error("Verification token not found");
  }

  // Check expiry
  if (storedToken.expiresAt < new Date()) {
    throw new Error("Verification token expired");
  }

  // Already verified?
  if (storedToken.user.isVerified) {
    throw new Error("Email already verified");
  }

  // Verify email
  await verifyUserEmail(payload.userId);

  await deleteEmailVerificationToken(token);

  return {
    message: "Email verified successfully",
  };
}