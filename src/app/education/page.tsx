import { CTAStrip } from "@/app/components/CTAStrip";
import { ContentPageHeader } from "@/app/components/ContentPageHeader";
import FaqSection from "./components/FaqSection";
import GlossarySection from "./components/GlossarySection";
import { SectionRenderer } from "./components/SectionRenderer";
import { WorkshopModeToggle } from "@/app/developer/components/WorkshopModeToggle";
import { getEducationContent } from "@/lib/content/getEducationContent";

export default async function EducationPage() {
  const content = await getEducationContent();

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <ContentPageHeader title={content.title} tagline={content.tagline} />

        <div className="space-y-12">
          {content.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>

        {content.faqs && content.faqs.length > 0 && (
          <FaqSection items={content.faqs} />
        )}

        {content.glossary && content.glossary.length > 0 && (
          <GlossarySection items={content.glossary} />
        )}

        <CTAStrip
          title={content.ctaStrip.title}
          body={content.ctaStrip.body}
          primary={content.ctaStrip.primary}
          secondary={content.ctaStrip.secondary}
        />
      </div>
      <WorkshopModeToggle />
    </>
  );
}

