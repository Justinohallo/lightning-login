import { z } from "zod";

export const DeveloperWalletsSchema = z.object({
  updatedAt: z.string(),
  wallets: z.array(
    z.object({
      name: z.string(),
      platform: z.array(z.string()),
      supportsAuth: z.boolean(),
      notes: z.string().optional()
    })
  )
});

export type DeveloperWallets = z.infer<typeof DeveloperWalletsSchema>;

