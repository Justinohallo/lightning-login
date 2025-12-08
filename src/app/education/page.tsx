import { getEducationContent } from "@/lib/content/getEducationContent";
import { ContentPageHeader } from "@/app/components/ContentPageHeader";
import { CTAStrip } from "@/app/components/CTAStrip";
import { SectionRenderer } from "./components/SectionRenderer";

export default async function EducationPage() {
  const content = await getEducationContent();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <ContentPageHeader title={content.title} tagline={content.tagline} />
      
      <div className="space-y-12">
        {content.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>

      <CTAStrip
        title={content.ctaStrip.title}
        body={content.ctaStrip.body}
        primary={content.ctaStrip.primary}
        secondary={content.ctaStrip.secondary}
      />
    </div>
  );
}

