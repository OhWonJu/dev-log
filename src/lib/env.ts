import { z } from "zod";

const envSchema = z.object({
  ADMIN_CODE: z.string().default(""),
  SITE_URL: z.string(),
  GTM_KEY: z.string(),
});

export const env = envSchema.parse({
  ADMIN_CODE: process.env.ADMIN_CODE,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  GTM_KEY: process.env.GTM_KEY,
});
