import { type Metadata } from "next";
import { getDeveloperContent } from "@/lib/content/getDeveloperContent";
import { ContentPageHeader } from "@/app/components/ContentPageHeader";
import { DeveloperSectionRenderer } from "../components/DeveloperSectionRenderer";
import { DevNavigation } from "../components/DevNavigation";
import { WorkshopModeToggle } from "../components/WorkshopModeToggle";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

type DeveloperSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const content = getDeveloperContent();
  return content.sections.map((section) => ({
    slug: section.slug,
  }));
}

export async function generateMetadata({
  params,
}: DeveloperSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getDeveloperContent();
  const section = content.sections.find((s) => s.slug === slug);
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  if (!section) {
    return {
      title: "Section Not Found | Lightning Login",
    };
  }

  return {
    title: `${section.title} | ${content.title}`,
    description: section.intro || section.title,
    openGraph: {
      title: section.title,
      description: section.intro || section.title,
      url: `${baseUrl}/developer/${slug}`,
      siteName: "Lightning Login",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: section.title,
      description: section.intro || section.title,
    },
  };
}

export default async function DeveloperSlugPage({
  params,
}: DeveloperSlugPageProps) {
  const { slug } = await params;
  const content = getDeveloperContent();

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

