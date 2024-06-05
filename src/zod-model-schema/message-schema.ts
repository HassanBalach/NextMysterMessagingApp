import { z } from "zod";

export const messageSchema = z.object({
  message: z
  .string()
  .min(5, { message: "Username must be at least 2 characters" })
  .max(15, { message: "Username must be no more than 300 characters" })
});
