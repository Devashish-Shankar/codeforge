import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../repositories/user.repository.js";

import { hashPassword } from "../utils/password.js";

import type { RegisterInput } from "../validators/register.validator.js";

import { saveEmailVerificationToken } from "../repositories/user.repository.js";

import { generateEmailVerificationToken } from "../utils/jwt.js";

import { getEmailVerificationExpiry } from "../utils/date.js";

import { ENV } from "../constants/env.js";

export async function registerService(data: RegisterInput) {
  const existingEmail = await findUserByEmail(data.email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const existingUsername = await findUserByUsername(data.username);

  if (existingUsername) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({
    username: data.username,
    email: data.email,
    password: hashedPassword,
  });

  const verificationToken =
  generateEmailVerificationToken({
    userId: user.id,
    email: user.email,
  });

  const expiresAt = getEmailVerificationExpiry();

  await saveEmailVerificationToken({
    token: verificationToken,
    userId: user.id,
    expiresAt,
  });

  return {
    user,
    verificationLink: `http://localhost:${ENV.PORT}/auth/verify-email?token=${verificationToken}`,
  };
}