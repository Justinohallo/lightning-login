import { type EducationSection } from "@/lib/schemas/educationSchema";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { EvolutionSection } from "./EvolutionSection";
import { ConceptSection } from "./ConceptSection";
import { TechnologySection } from "./TechnologySection";
import { ComparisonSection } from "./ComparisonSection";
import { SummarySection } from "./SummarySection";

type SectionRendererProps = {
  section: EducationSection;
};

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.kind) {
    case "hero":
      return <HeroSection section={section as EducationSection & { kind: "hero" }} />;
    case "problem":
      return <ProblemSection section={section as EducationSection & { kind: "problem" }} />;
    case "evolution":
      return <EvolutionSection section={section as EducationSection & { kind: "evolution" }} />;
    case "concept":
      return <ConceptSection section={section as EducationSection & { kind: "concept" }} />;
    case "technology":
      return <TechnologySection section={section as EducationSection & { kind: "technology" }} />;
    case "comparison":
      return <ComparisonSection section={section as EducationSection & { kind: "comparison" }} />;
    case "summary":
      return <SummarySection section={section as EducationSection & { kind: "summary" }} />;
    default:
      return null;
  }
}

