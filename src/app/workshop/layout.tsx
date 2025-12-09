import { type Metadata } from "next";
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

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

