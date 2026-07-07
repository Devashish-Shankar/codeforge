import { findUserByEmail } from "../repositories/user.repository.js";
import { verifyPassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import { getRefreshTokenExpiry } from "../utils/date.js";
import type { LoginDto } from "../validators/login.validator.js";
import {saveRefreshToken} from "../repositories/user.repository.js";
import {ENV} from "../constants/env.js";

export async function loginService(data: LoginDto) {
  // Find user
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isPasswordValid = await verifyPassword(
    user.password,
    data.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate Tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    username: user.username,
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    username: user.username,
    email: user.email,
  });

  const expiresAt = getRefreshTokenExpiry();
  
  await saveRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt,
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
}