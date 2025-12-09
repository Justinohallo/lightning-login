"use client";

import Link from "next/link";
import { type DeveloperSection } from "@/lib/schemas/developerSchema";

type DevNavigationProps = {
  sections: DeveloperSection[];
  navOrder: string[];
  currentSlug?: string;
};

export function DevNavigation({
  sections,
  navOrder,
  currentSlug,
}: DevNavigationProps) {
  // Create a map of slugs to sections for quick lookup
  const sectionMap = new Map(sections.map((s) => [s.slug, s]));

  // Get sections in navOrder order
  const orderedSections = navOrder
    .map((slug) => sectionMap.get(slug))
    .filter((section): section is DeveloperSection => section !== undefined);

  return (
    <>
      {/* Desktop: Vertical Sidebar */}
      <nav className="hidden md:block w-64 flex-shrink-0 pr-8">
        <ul className="sticky top-8 space-y-1">
          <li>
            <Link
              href="/developer"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentSlug === undefined
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              Overview
            </Link>
          </li>
          {orderedSections.map((section) => (
            <li key={section.slug}>
              <Link
                href={`/developer/${section.slug}`}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentSlug === section.slug
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: Horizontal Scrollable Bar */}
      <nav className="md:hidden mb-6">
        <div className="overflow-x-auto -mx-6 px-6">
          <ul className="flex space-x-2 min-w-max">
            <li>
              <Link
                href="/developer"
                className={`inline-block px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  currentSlug === undefined
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                Overview
              </Link>
            </li>
            {orderedSections.map((section) => (
              <li key={section.slug}>
                <Link
                  href={`/developer/${section.slug}`}
                  className={`inline-block px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    currentSlug === section.slug
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

