import Link from "next/link";
import workshopData from "@/content/workshop.json";
import workshopImplementationData from "@/content/workshop-implementation.json";

const workshops = {
  overview: {
    name: "Overview",
    description: "An introduction to Lightning Login and modern authentication. Learn how passwordless authentication works and why Lightning Login offers a sovereign alternative.",
    slideCount: workshopData.slides.length,
  },
  implementation: {
    name: "Implementation Walkthrough",
    description: "A step-by-step guide to implementing Lightning Login in your application. Covers everything from generating challenges to verifying signatures.",
    slideCount: workshopImplementationData.slides.length,
  },
};

export default function WorkshopHubPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6 text-black dark:text-white">
            Workshop Hub
          </h1>
          <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            Interactive presentations and workshops to help you understand and implement Lightning Login.
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Each workshop is designed as a slide-based presentation that you can navigate at your own pace.
            Use arrow keys or the navigation buttons to move between slides.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {Object.entries(workshops).map(([slug, workshop]) => (
            <Link
              key={slug}
              href={`/workshop/${slug}`}
              className="block p-8 bg-neutral-50 dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
                {workshop.name}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                {workshop.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {workshop.slideCount} slides
                </span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Start Workshop →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
            Navigation Tips
          </h3>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start">
              <span className="mr-2">→</span>
              <span>Use <kbd className="px-2 py-1 bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">→</kbd> or <kbd className="px-2 py-1 bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">←</kbd> arrow keys to navigate between slides</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">→</span>
              <span>Press <kbd className="px-2 py-1 bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">Esc</kbd> to return to the hub</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">→</span>
              <span>Click the navigation buttons at the bottom of each slide</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
