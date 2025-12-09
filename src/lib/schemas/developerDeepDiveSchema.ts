import { z } from "zod";

export const DeveloperDeepDiveSchema = z.object({
  protocolName: z.literal("LNURL-auth"),
  overview: z.string(),
  flowDiagramSteps: z.array(z.string()),
  cryptography: z.object({
    keys: z.string(),
    signatures: z.string(),
    challengeResponse: z.string()
  }),
  serverResponsibilities: z.array(z.string()),
  walletResponsibilities: z.array(z.string()),
  risks: z.array(z.string())
});

export type DeveloperDeepDive = z.infer<typeof DeveloperDeepDiveSchema>;

