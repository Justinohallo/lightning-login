import { type EducationSection } from "@/lib/schemas/educationSchema";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { EvolutionSection } from "./EvolutionSection";
import { ConceptSection } from "./ConceptSection";
import { TechnologySection } from "./TechnologySection";
import { ComparisonSection } from "./ComparisonSection";
import { SummarySection } from "./SummarySection";
import FaqSection from "./FaqSection";
import GlossarySection from "./GlossarySection";

type SectionRendererProps = {
  section: EducationSection;
};

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.kind) {
    case "hero":
      return <HeroSection section={section} />;
    case "problem":
      return <ProblemSection section={section} />;
    case "evolution":
      return <EvolutionSection section={section} />;
    case "concept":
      return <ConceptSection section={section} />;
    case "technology":
      return <TechnologySection section={section} />;
    case "comparison":
      return <ComparisonSection section={section} />;
    case "summary":
      return <SummarySection section={section} />;
    case "faq":
      return <FaqSection items={section.faqItems} />;
    case "glossary":
      return <GlossarySection items={section.glossaryItems} />;
    default:
      return null;
  }
}

