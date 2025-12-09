import { type Metadata } from "next";
import sites from "@/content/sites.json";
import { env } from "@/lib/env";

export function generateMetadata(): Metadata {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: "Sites Supporting Lightning Login | Lightning Login",
    description:
      "Discover websites and applications that use Lightning Login (LNURL-auth) for sovereign authentication.",
    openGraph: {
      title: "Sites Supporting Lightning Login",
      description:
        "Discover websites and applications that use Lightning Login (LNURL-auth) for sovereign authentication.",
      url: `${baseUrl}/sites`,
      siteName: "Lightning Login",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Sites Supporting Lightning Login",
      description:
        "Discover websites and applications that use Lightning Login (LNURL-auth) for sovereign authentication.",
    },
  };
}

export default function SitesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Sites Supporting Lightning Login</h1>
      <ul className="space-y-4">
        {sites.map((site) => (
          <li key={site.url} className="border p-4 rounded">
            <h2 className="font-semibold">{site.name}</h2>
            <p>{site.description}</p>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Visit {site.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

