import { type Metadata } from "next";
import { CTAStrip } from "@/app/components/CTAStrip";
import { ContentPageHeader } from "@/app/components/ContentPageHeader";
import FaqSection from "./components/FaqSection";
import GlossarySection from "./components/GlossarySection";
import { SectionRenderer } from "./components/SectionRenderer";
import { WorkshopModeToggle } from "@/app/developer/components/WorkshopModeToggle";
import { getEducationContent } from "@/lib/content/getEducationContent";
import { env } from "@/lib/env";

export function generateMetadata(): Metadata {
  const content = getEducationContent();
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: `${content.title} | Lightning Login`,
    description: content.tagline,
    openGraph: {
      title: content.title,
      description: content.tagline,
      url: `${baseUrl}/education`,
      siteName: "Lightning Login",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.tagline,
    },
  };
}

export default function EducationPage() {
  const content = getEducationContent();

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

