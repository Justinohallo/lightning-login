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

// Base section schema with common fields
const BaseDeveloperSectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  intro: z.string().optional(),
  paragraphs: z.array(z.string()).default([]),
});

// Specific section schemas for discriminated union
const OverviewSectionSchema = BaseDeveloperSectionSchema.extend({
  kind: z.literal("overview"),
  takeaway: z.string().optional(),
});

const ArchitectureSectionSchema = BaseDeveloperSectionSchema.extend({
  kind: z.literal("architecture"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
});

const ProtocolSectionSchema = BaseDeveloperSectionSchema.extend({
  kind: z.literal("protocol"),
  bulletPoints: z.array(z.string()).optional(),
  codeExamples: z.array(DevCodeExampleSchema).optional(),
  takeaway: z.string().optional(),
});

const CodeExampleSectionSchema = BaseDeveloperSectionSchema.extend({
  kind: z.literal("code-example"),
  codeExamples: z.array(DevCodeExampleSchema),
  takeaway: z.string().optional(),
});

const LibrarySectionSchema = BaseDeveloperSectionSchema.extend({
  kind: z.literal("library"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
});

const DevComparisonSectionSchema = BaseDeveloperSectionSchema.extend({
  kind: z.literal("comparison"),
  comparisonTable: ComparisonTableSchema,
  takeaway: z.string().optional(),
});

const StepByStepSectionSchema = BaseDeveloperSectionSchema.extend({
  kind: z.literal("step-by-step"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
});

const DevFaqSectionSchema = BaseDeveloperSectionSchema.extend({
  kind: z.literal("faq"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
});

// Discriminated union for all section types
export const DeveloperSectionSchema = z.discriminatedUnion("kind", [
  OverviewSectionSchema,
  ArchitectureSectionSchema,
  ProtocolSectionSchema,
  CodeExampleSectionSchema,
  LibrarySectionSchema,
  DevComparisonSectionSchema,
  StepByStepSectionSchema,
  DevFaqSectionSchema,
]);

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

// Specific section types for type narrowing
export type OverviewSection = z.infer<typeof OverviewSectionSchema>;
export type ArchitectureSection = z.infer<typeof ArchitectureSectionSchema>;
export type ProtocolSection = z.infer<typeof ProtocolSectionSchema>;
export type CodeExampleSection = z.infer<typeof CodeExampleSectionSchema>;
export type LibrarySection = z.infer<typeof LibrarySectionSchema>;
export type DevComparisonSection = z.infer<typeof DevComparisonSectionSchema>;
export type StepByStepSection = z.infer<typeof StepByStepSectionSchema>;
export type DevFaqSection = z.infer<typeof DevFaqSectionSchema>;

