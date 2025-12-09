import { type Metadata } from "next";
import { workshopSlides } from "@/content/workshop";
import { env } from "@/lib/env";

export function generateMetadata(): Metadata {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: "Lightning Login Workshop | Lightning Login",
    description:
      "Presentation slides and workshop materials for Lightning Login (LNURL-auth) authentication.",
    openGraph: {
      title: "Lightning Login Workshop",
      description:
        "Presentation slides and workshop materials for Lightning Login (LNURL-auth) authentication.",
      url: `${baseUrl}/workshop`,
      siteName: "Lightning Login",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Lightning Login Workshop",
      description:
        "Presentation slides and workshop materials for Lightning Login (LNURL-auth) authentication.",
    },
  };
}

export default function WorkshopPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Lightning Login Workshop</h1>
      <div className="space-y-12">
        {workshopSlides.map((slide, index) => (
          <div key={slide.id} className="border-b pb-8">
            <div className="text-sm text-neutral-500 mb-2">
              Slide {index + 1} of {workshopSlides.length}
            </div>
            <h2 className="text-2xl font-bold mb-4">{slide.title}</h2>
            <ul className="space-y-2 list-disc list-inside">
              {slide.content.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

