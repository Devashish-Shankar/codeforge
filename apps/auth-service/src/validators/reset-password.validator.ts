import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100)
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[a-z]/, "Password must contain one lowercase letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain one special character"
    ),
});

export type ResetPasswordDto = z.infer<
  typeof resetPasswordSchema
>;