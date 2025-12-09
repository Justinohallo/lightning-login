import { type DeveloperSection } from "@/lib/schemas/developerSchema";
import { OverviewSection } from "./OverviewSection";
import { ArchitectureSection } from "./ArchitectureSection";
import { ProtocolSection } from "./ProtocolSection";
import { CodeExampleSection } from "./CodeExampleSection";
import { LibrarySection } from "./LibrarySection";
import { ComparisonSection } from "./ComparisonSection";
import { StepByStepSection } from "./StepByStepSection";
import { FaqSection } from "./FaqSection";

type DeveloperSectionRendererProps = {
  section: DeveloperSection;
};

export function DeveloperSectionRenderer({
  section,
}: DeveloperSectionRendererProps) {
  switch (section.kind) {
    case "overview":
      return <OverviewSection section={section} />;
    case "architecture":
      return <ArchitectureSection section={section} />;
    case "protocol":
      return <ProtocolSection section={section} />;
    case "code-example":
      return <CodeExampleSection section={section} />;
    case "library":
      return <LibrarySection section={section} />;
    case "comparison":
      return <ComparisonSection section={section} />;
    case "step-by-step":
      return <StepByStepSection section={section} />;
    case "faq":
      return <FaqSection section={section} />;
    default:
      return null;
  }
}

