"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { totalSlides } from "@/content/workshop";

function WorkshopNavigationContent() {
  const router = useRouter();
  const params = useSearchParams();
  const currentIndex = parseInt(params.get("index") ?? "0", 10);

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, totalSlides - 1));
    router.push(`/workshop?index=${clamped}`);
  };

  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
      <button
        disabled={currentIndex === 0}
        onClick={() => goTo(currentIndex - 1)}
        className="px-6 py-3 bg-neutral-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors font-medium"
        aria-label="Previous slide"
      >
        ← Prev
      </button>
      <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
        Slide {currentIndex + 1}/{totalSlides}
      </span>
      <button
        disabled={currentIndex === totalSlides - 1}
        onClick={() => goTo(currentIndex + 1)}
        className="px-6 py-3 bg-neutral-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors font-medium"
        aria-label="Next slide"
      >
        Next →
      </button>
    </div>
  );
}

export default function WorkshopNavigation() {
  return (
    <Suspense fallback={null}>
      <WorkshopNavigationContent />
    </Suspense>
  );
}

