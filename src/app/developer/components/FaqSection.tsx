import { type DeveloperSection } from "@/lib/schemas/developerSchema";

type FaqSectionProps = {
  section: DeveloperSection & { kind: "faq" };
};

export function FaqSection({ section }: FaqSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
      {section.intro && (
        <p className="text-lg mb-4 text-neutral-700">{section.intro}</p>
      )}
      <div className="space-y-4 leading-relaxed prose prose-neutral max-w-none">
        {section.paragraphs.map((paragraph, index) => {
          // Format Q&A pairs - if paragraph starts with "Q:" it's a question
          if (paragraph.startsWith("Q:")) {
            return (
              <div key={index} className="mt-6">
                <p className="font-semibold text-neutral-900">{paragraph}</p>
              </div>
            );
          } else if (paragraph.startsWith("A:")) {
            return (
              <p key={index} className="text-neutral-700 mb-4">
                {paragraph}
              </p>
            );
          } else if (paragraph === "") {
            return <div key={index} className="h-2" />;
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </div>
      {section.takeaway && (
        <div className="mt-6 p-4 bg-neutral-50 border-l-4 border-neutral-400">
          <p className="font-medium italic">{section.takeaway}</p>
        </div>
      )}
    </section>
  );
}

