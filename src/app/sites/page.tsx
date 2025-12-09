import { sites } from "@/content/sites";

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

