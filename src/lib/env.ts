import { z } from "zod";

const envSchema = z.object({
  ADMIN_CODE: z.string(),
});

export const env = envSchema.parse({
  ADMIN_CODE: process.env.ADMIN_CODE,
});
