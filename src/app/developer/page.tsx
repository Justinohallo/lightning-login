import { type Metadata } from "next";
import { getDeveloperContent } from "@/lib/content/getDeveloperContent";
import { ContentPageHeader } from "@/app/components/ContentPageHeader";
import { DeveloperSectionRenderer } from "./components/DeveloperSectionRenderer";
import { DevNavigation } from "./components/DevNavigation";
import { WorkshopModeToggle } from "./components/WorkshopModeToggle";
import { env } from "@/lib/env";

export function generateMetadata(): Metadata {
  const content = getDeveloperContent();
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: `${content.title} | Lightning Login`,
    description: content.tagline,
    openGraph: {
      title: content.title,
      description: content.tagline,
      url: `${baseUrl}/developer`,
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

export default function DeveloperPage() {
  const content = getDeveloperContent();

  return (
    <>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row gap-8">
          <DevNavigation
            sections={content.sections}
            navOrder={content.navOrder}
          />
          <div className="flex-1">
            <ContentPageHeader
              title={content.title}
              tagline={content.tagline}
            />
            <div className="space-y-12">
              {content.sections.map((section) => (
                <DeveloperSectionRenderer
                  key={section.id}
                  section={section}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <WorkshopModeToggle />
    </>
  );
}
