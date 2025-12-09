import { type DeveloperSection } from "@/lib/schemas/developerSchema";
import { DevCodeBlock } from "./DevCodeBlock";

type ProtocolSectionProps = {
  section: DeveloperSection & { kind: "protocol" };
};

export function ProtocolSection({ section }: ProtocolSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
      {section.intro && (
        <p className="text-lg mb-4 text-neutral-700">{section.intro}</p>
      )}
      <div className="space-y-4 leading-relaxed prose prose-neutral max-w-none">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {section.codeExamples &&
        section.codeExamples.map((example) => (
          <DevCodeBlock
            key={example.id}
            title={example.title}
            description={example.description}
            language={example.language}
            code={example.code}
          />
        ))}
      {section.takeaway && (
        <div className="mt-6 p-4 bg-neutral-50 border-l-4 border-neutral-400">
          <p className="font-medium italic">{section.takeaway}</p>
        </div>
      )}
    </section>
  );
}

