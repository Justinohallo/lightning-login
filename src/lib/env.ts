import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url()
    .optional()
    .default("https://lightning-login.vercel.app"),
});

function getEnv() {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
    );
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = getEnv();

