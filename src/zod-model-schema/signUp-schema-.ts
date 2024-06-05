import { z } from "zod";
const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;

// creating a schema for strings
const username = z
  .string()
  .min(5, { message: "Username must be at least 2 characters" })
  .max(15, { message: "Username must be no more than 20 characters" })
  .regex(usernameRegex);

export const signUpUser = z.object({
  username: username,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
