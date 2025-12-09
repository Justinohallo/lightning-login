import { z } from "zod";

export const AudienceEnum = z.enum([
  "newcomers",
  "builders",
  "product",
  "design",
  "developers",
]);

const CallToActionSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const ComparisonTableSchema = z.object({
  columns: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

export const FaqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const GlossaryItemSchema = z.object({
  term: z.string(),
  definition: z.string(),
});

export const SectionKindEnum = z.enum([
  "hero",
  "problem",
  "evolution",
  "concept",
  "technology",
  "comparison",
  "summary",
  "faq",
  "glossary",
]);

// Base section schema with common fields
const BaseEducationSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  intro: z.string().optional(),
  paragraphs: z.array(z.string()).default([]),
});

// Specific section schemas for discriminated union
const HeroSectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("hero"),
  bullets: z.array(z.string()).optional(),
  callToAction: CallToActionSchema.optional(),
});

const ProblemSectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("problem"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
});

const EvolutionSectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("evolution"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
});

const ConceptSectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("concept"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
});

const TechnologySectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("technology"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
});

const ComparisonSectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("comparison"),
  comparisonTable: ComparisonTableSchema,
  takeaway: z.string().optional(),
});

const SummarySectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("summary"),
  bulletPoints: z.array(z.string()).optional(),
  takeaway: z.string().optional(),
  callToAction: CallToActionSchema.optional(),
});

const FaqSectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("faq"),
  faqItems: z.array(FaqItemSchema),
});

const GlossarySectionSchema = BaseEducationSectionSchema.extend({
  kind: z.literal("glossary"),
  glossaryItems: z.array(GlossaryItemSchema),
});

// Discriminated union for all section types
export const EducationSectionSchema = z.discriminatedUnion("kind", [
  HeroSectionSchema,
  ProblemSectionSchema,
  EvolutionSectionSchema,
  ConceptSectionSchema,
  TechnologySectionSchema,
  ComparisonSectionSchema,
  SummarySectionSchema,
  FaqSectionSchema,
  GlossarySectionSchema,
]);

export const CtaStripSchema = z.object({
  title: z.string(),
  body: z.string(),
  primary: CallToActionSchema,
  secondary: CallToActionSchema.optional(),
});

export const LightningLoginEducationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  audience: z.array(AudienceEnum),
  goals: z.array(z.string()),
  sections: z.array(EducationSectionSchema),
  faqs: z.array(FaqItemSchema),
  glossary: z.array(GlossaryItemSchema),
  ctaStrip: CtaStripSchema,
});

// Inferred TypeScript types
export type LightningLoginEducation = z.infer<
  typeof LightningLoginEducationSchema
>;

export type EducationSection = z.infer<typeof EducationSectionSchema>;
export type FaqItem = z.infer<typeof FaqItemSchema>;
export type GlossaryItem = z.infer<typeof GlossaryItemSchema>;

// Specific section types for type narrowing
export type HeroSection = z.infer<typeof HeroSectionSchema>;
export type ProblemSection = z.infer<typeof ProblemSectionSchema>;
export type EvolutionSection = z.infer<typeof EvolutionSectionSchema>;
export type ConceptSection = z.infer<typeof ConceptSectionSchema>;
export type TechnologySection = z.infer<typeof TechnologySectionSchema>;
export type ComparisonSection = z.infer<typeof ComparisonSectionSchema>;
export type SummarySection = z.infer<typeof SummarySectionSchema>;
export type FaqSection = z.infer<typeof FaqSectionSchema>;
export type GlossarySection = z.infer<typeof GlossarySectionSchema>;

