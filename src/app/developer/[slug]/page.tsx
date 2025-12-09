import { getDeveloperContent } from "@/lib/content/getDeveloperContent";
import { ContentPageHeader } from "@/app/components/ContentPageHeader";
import { DeveloperSectionRenderer } from "../components/DeveloperSectionRenderer";
import { DevNavigation } from "../components/DevNavigation";
import { WorkshopModeToggle } from "../components/WorkshopModeToggle";
import { notFound } from "next/navigation";

type DeveloperSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DeveloperSlugPage({
  params,
}: DeveloperSlugPageProps) {
  const { slug } = await params;
  const content = await getDeveloperContent();

  const section = content.sections.find((s) => s.slug === slug);

  if (!section) {
    notFound();
  }

  return (
    <>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row gap-8">
          <DevNavigation
            sections={content.sections}
            navOrder={content.navOrder}
            currentSlug={slug}
          />
          <div className="flex-1">
            <ContentPageHeader
              title={content.title}
              tagline={content.tagline}
            />
            <DeveloperSectionRenderer section={section} />
          </div>
        </div>
      </div>
      <WorkshopModeToggle />
    </>
  );
}

