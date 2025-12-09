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
      return (
        <OverviewSection
          section={section as DeveloperSection & { kind: "overview" }}
        />
      );
    case "architecture":
      return (
        <ArchitectureSection
          section={section as DeveloperSection & { kind: "architecture" }}
        />
      );
    case "protocol":
      return (
        <ProtocolSection
          section={section as DeveloperSection & { kind: "protocol" }}
        />
      );
    case "code-example":
      return (
        <CodeExampleSection
          section={section as DeveloperSection & { kind: "code-example" }}
        />
      );
    case "library":
      return (
        <LibrarySection
          section={section as DeveloperSection & { kind: "library" }}
        />
      );
    case "comparison":
      return (
        <ComparisonSection
          section={section as DeveloperSection & { kind: "comparison" }}
        />
      );
    case "step-by-step":
      return (
        <StepByStepSection
          section={section as DeveloperSection & { kind: "step-by-step" }}
        />
      );
    case "faq":
      return (
        <FaqSection
          section={section as DeveloperSection & { kind: "faq" }}
        />
      );
    default:
      return null;
  }
}

