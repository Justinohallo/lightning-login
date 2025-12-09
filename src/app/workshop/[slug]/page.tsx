"use client";

import { Suspense, useEffect, useCallback, useRef, startTransition, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import Link from "next/link";
import Slide from "../components/Slide";
import WorkshopNavigation from "../components/WorkshopNavigation";
import workshopData from "@/content/workshop.json";
import workshopImplementationData from "@/content/workshop-implementation.json";
import { type WorkshopSlide } from "@/lib/types/content";

const workshops = {
  overview: {
    name: "Overview",
    description: "An introduction to Lightning Login and modern authentication",
    slides: workshopData.slides as WorkshopSlide[],
  },
  implementation: {
    name: "Implementation Walkthrough",
    description: "Step-by-step guide to implementing Lightning Login",
    slides: workshopImplementationData.slides as WorkshopSlide[],
  },
};

type WorkshopKey = keyof typeof workshops;

function PresentationContent({ fullscreenRef }: { fullscreenRef: React.RefObject<HTMLDivElement | null> }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const workshopKey = (params.slug as WorkshopKey) || "overview";
  const workshop = workshops[workshopKey] || workshops.overview;
  const slides = workshop.slides;
  
  // Get slide index from URL search params
  const slideIndex = parseInt(searchParams.get("slide") ?? "0", 10);
  const clampedIndex = Math.max(0, Math.min(slideIndex, slides.length - 1));
  const slide = slides[clampedIndex];

  // Prevent scroll restoration and keep slides in view
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Disable automatic scroll restoration
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }
  }, []);

  // Keep viewport at top whenever slide changes - prevent any scrolling
  useEffect(() => {
    // Use requestAnimationFrame to ensure this runs after any navigation
    const preventScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    };

    // Run immediately and after a short delay to catch any delayed scroll
    preventScroll();
    const timeoutId = setTimeout(preventScroll, 0);
    const rafId = requestAnimationFrame(preventScroll);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [clampedIndex, workshopKey]);

  const goToSlide = useCallback((newIndex: number) => {
    const clamped = Math.max(0, Math.min(newIndex, slides.length - 1));
    // Update URL without causing scroll - use replace to avoid adding to history
    const url = `/workshop/${workshopKey}?slide=${clamped}`;
    startTransition(() => {
      router.replace(url);
    });
  }, [workshopKey, slides.length, router]);

  // Fullscreen functionality
  const enterFullscreen = useCallback(async () => {
    try {
      const element = fullscreenRef.current;
      if (!element) {
        console.error("Fullscreen ref not available");
        return;
      }
      
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      } else {
        console.warn("Fullscreen API not supported in this browser");
      }
    } catch (error) {
      console.error("Error entering fullscreen:", error);
      // Fallback: try document.documentElement
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (fallbackError) {
        console.error("Fallback fullscreen also failed:", fallbackError);
      }
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error("Error exiting fullscreen:", error);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    console.log("Toggle fullscreen called, current state:", isFullscreen);
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Direct handler for button click
  const handleFullscreenClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Button clicked, fullscreenRef.current:", fullscreenRef.current);
    
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      // Try to enter fullscreen directly
      const element = fullscreenRef.current;
      if (element) {
        try {
          if (element.requestFullscreen) {
            await element.requestFullscreen();
          } else if ((element as any).webkitRequestFullscreen) {
            await (element as any).webkitRequestFullscreen();
          } else if ((element as any).mozRequestFullScreen) {
            await (element as any).mozRequestFullScreen();
          } else if ((element as any).msRequestFullscreen) {
            await (element as any).msRequestFullscreen();
          } else {
            console.warn("Fullscreen API not supported");
          }
        } catch (error) {
          console.error("Fullscreen error:", error);
        }
      } else {
        console.error("Element ref is null");
      }
    }
  }, [isFullscreen, exitFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // F11 or F key for fullscreen toggle
      if (e.key === "F11") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }
      if (e.key === "ArrowRight") {
        goToSlide(clampedIndex + 1);
      }
      if (e.key === "ArrowLeft") {
        goToSlide(clampedIndex - 1);
      }
      if (e.key === "Escape") {
        // Exit fullscreen first if in fullscreen, otherwise go to hub
        if (isFullscreen) {
          exitFullscreen();
        } else {
          router.push("/workshop");
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [clampedIndex, goToSlide, router, isFullscreen, toggleFullscreen, exitFullscreen]);

  return (
    <div className="h-full w-full">
      <div ref={containerRef} className="h-full w-full">
        <Slide slide={slide} />
        {!isFullscreen && (
          <>
            <WorkshopNavigation workshopKey={workshopKey} totalSlides={slides.length} currentIndex={clampedIndex} goToSlide={goToSlide} />
            <Link
              href="/workshop"
              className="absolute top-4 left-4 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium z-10"
              aria-label="Back to workshop hub"
            >
              ← Back to Hub
            </Link>
            <button
              onClick={handleFullscreenClick}
              className="absolute top-4 right-4 bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors font-medium z-10 flex items-center gap-2"
              aria-label="Enter presentation mode"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              Presentation Mode
            </button>
          </>
        )}
        {isFullscreen && (
          <div className="absolute top-4 right-4 text-white/70 text-sm z-10">
            Press <kbd className="px-2 py-1 bg-white/20 rounded">Esc</kbd> to exit fullscreen
          </div>
        )}
      </div>
    </div>
  );
}

export default function PresentationPage() {
  const fullscreenRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={fullscreenRef}
      className="h-screen w-screen overflow-hidden bg-white dark:bg-neutral-900 text-black dark:text-white relative"
      id="presentation-container"
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-xl">Loading presentation...</div>
          </div>
        }
      >
        <PresentationContent fullscreenRef={fullscreenRef} />
      </Suspense>
    </div>
  );
}

