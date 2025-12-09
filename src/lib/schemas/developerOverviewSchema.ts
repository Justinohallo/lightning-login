import { z } from "zod";

export const DeveloperOverviewSchema = z.object({
  title: z.string(),
  summary: z.string(),
  sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      items: z.array(z.string())
    })
  )
});

export type DeveloperOverview = z.infer<typeof DeveloperOverviewSchema>;

