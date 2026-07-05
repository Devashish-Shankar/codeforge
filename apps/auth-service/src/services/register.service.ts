import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../repositories/user.repository.js";

import { hashPassword } from "../utils/password.js";

import type { RegisterInput } from "../validators/register.validator.js";

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

  return user;
}