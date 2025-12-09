import { type Metadata } from "next";
import Link from "next/link";
import { getEducationContent } from "@/lib/content/getEducationContent";
import { env } from "@/lib/env";

export function generateMetadata(): Metadata {
  const content = getEducationContent();
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: content.title,
    description: content.tagline,
    openGraph: {
      title: content.title,
      description: content.tagline,
      url: baseUrl,
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

export default function Home() {
  const content = getEducationContent();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">{content.title}</h1>
        <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
          {content.tagline}
        </p>
        <Link
          href="/education"
          className="inline-block px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
        >
          Learn About Lightning Login
        </Link>
      </div>
    </div>
  );
}
