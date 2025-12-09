import Link from "next/link";
import { type SummarySection as SummarySectionType } from "@/lib/content-schemas/lightning-login-education";

type SummarySectionProps = {
  section: SummarySectionType;
};

export function SummarySection({ section }: SummarySectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
      {section.intro && (
        <p className="text-lg mb-4 text-neutral-700">{section.intro}</p>
      )}
      <div className="space-y-4 leading-relaxed">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {section.callToAction && (
        <div className="mt-6">
          <Link
            href={section.callToAction.href}
            className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
          >
            {section.callToAction.label}
          </Link>
        </div>
      )}
    </section>
  );
}

