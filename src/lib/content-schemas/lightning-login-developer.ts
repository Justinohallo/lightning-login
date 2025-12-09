import { z } from "zod";

export const DevCodeExampleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  language: z.string(),
  code: z.string(),
});

export const DevSectionKindEnum = z.enum([
  "overview",
  "architecture",
  "protocol",
  "code-example",
  "library",
  "comparison",
  "step-by-step",
  "faq",
]);

const ComparisonTableSchema = z.object({
  columns: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

export const DeveloperSectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  kind: DevSectionKindEnum,
  title: z.string(),
  intro: z.string().optional(),
  paragraphs: z.array(z.string()).default([]),
  bulletPoints: z.array(z.string()).optional(),
  codeExamples: z.array(DevCodeExampleSchema).optional(),
  comparisonTable: ComparisonTableSchema.optional(),
  takeaway: z.string().optional(),
});

export const DeveloperContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  tagline: z.string(),
  sections: z.array(DeveloperSectionSchema),
  navOrder: z.array(z.string()), // slugs in order
});

// Inferred TypeScript types
export type DeveloperContent = z.infer<typeof DeveloperContentSchema>;
export type DeveloperSection = z.infer<typeof DeveloperSectionSchema>;
export type DevCodeExample = z.infer<typeof DevCodeExampleSchema>;

