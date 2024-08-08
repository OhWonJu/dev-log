import { z } from "zod";

const envSchema = z.object({
  ADMIN_CODE: z.string().default(""),
  CHAT_ADMIN_CODE: z.string(),
  SITE_URL: z.string(),
  GTM_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  ADMIN_CODE: process.env.ADMIN_CODE,
  CHAT_ADMIN_CODE: process.env.CHAT_ADMIN_CODE,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  GTM_KEY: process.env.GTM_KEY!,
});
