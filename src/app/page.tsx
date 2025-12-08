import Link from "next/link";
import { getEducationContent } from "@/lib/content/getEducationContent";

export default async function Home() {
  const content = await getEducationContent();

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
