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

export const EducationSectionSchema = z.object({
  id: z.string(),
  kind: SectionKindEnum,
  title: z.string(),
  intro: z.string().optional(),
  paragraphs: z.array(z.string()).default([]),
  bullets: z.array(z.string()).optional(), // for hero-style bullets
  bulletPoints: z.array(z.string()).optional(), // for content lists
  comparisonTable: ComparisonTableSchema.optional(),
  takeaway: z.string().optional(),
  callToAction: CallToActionSchema.optional(),
  faqItems: z.array(FaqItemSchema).optional(),
  glossaryItems: z.array(GlossaryItemSchema).optional(),
});

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

