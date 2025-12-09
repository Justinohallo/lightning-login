"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import Slide from "./components/Slide";
import WorkshopNavigation from "./components/WorkshopNavigation";
import workshopData from "@/content/workshop.json";
import { type WorkshopSlide } from "@/lib/types/content";

const slides = workshopData.slides as WorkshopSlide[];

function WorkshopContent() {
  const router = useRouter();
  const params = useSearchParams();
  const idx = parseInt(params.get("index") ?? "0", 10);
  const slide = slides[Math.max(0, Math.min(idx, slides.length - 1))];

  const goToSlide = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(newIndex, slides.length - 1));
    router.push(`/workshop?index=${clamped}`);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToSlide(idx + 1);
      }
      if (e.key === "ArrowLeft") {
        goToSlide(idx - 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <>
      <Slide slide={slide} />
      <WorkshopNavigation />
    </>
  );
}

export default function WorkshopPage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-white dark:bg-neutral-900 text-black dark:text-white relative">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-xl">Loading workshop...</div>
          </div>
        }
      >
        <WorkshopContent />
      </Suspense>
      <Link
        href="/education"
        className="absolute top-4 left-4 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
        aria-label="Exit workshop"
      >
        Exit
      </Link>
    </div>
  );
}
