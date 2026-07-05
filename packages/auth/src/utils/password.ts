import argon2 from "argon2";

/**
 * Hash plain password
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

/**
 * Verify password
 */
export async function verifyPassword(
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> {
  return argon2.verify(hashedPassword, plainPassword);
}