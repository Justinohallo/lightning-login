import { z } from "zod";

export const DeveloperIntegrationSchema = z.object({
  patterns: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      useCase: z.string(),
      steps: z.array(z.string()),
      pros: z.array(z.string()),
      cons: z.array(z.string())
    })
  )
});

export type DeveloperIntegration = z.infer<typeof DeveloperIntegrationSchema>;

