import { z } from "zod";

export const DeveloperExamplesSchema = z.object({
  title: z.string(),
  examples: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      difficulty: z.enum(["beginner", "intermediate", "advanced"]),
      code: z.string()
    })
  )
});

export type DeveloperExamples = z.infer<typeof DeveloperExamplesSchema>;

