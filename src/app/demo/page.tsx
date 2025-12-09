import { type Metadata } from "next";
import { env } from "@/lib/env";

export function generateMetadata(): Metadata {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: "Lightning Login Demo | Lightning Login",
    description:
      "Try Lightning Login (LNURL-auth) authentication with your Lightning wallet.",
    openGraph: {
      title: "Lightning Login Demo",
      description:
        "Try Lightning Login (LNURL-auth) authentication with your Lightning wallet.",
      url: `${baseUrl}/demo`,
      siteName: "Lightning Login",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Lightning Login Demo",
      description:
        "Try Lightning Login (LNURL-auth) authentication with your Lightning wallet.",
    },
  };
}

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg text-neutral-600">
          The Lightning Login demo will be available here.
        </p>
      </div>
    </div>
  );
}

