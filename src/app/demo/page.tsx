import { type Metadata } from "next";
import { env } from "@/lib/env";
import { getSession } from "@/lib/session/getSession";
import LoggedIn from "./LoggedIn";
import DemoContent from "./DemoContent";

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

export default async function DemoPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        {session ? (
          <LoggedIn pubkey={session} />
        ) : (
          <DemoContent />
        )}
      </div>
    </div>
  );
}
