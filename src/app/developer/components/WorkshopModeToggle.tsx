"use client";

import { useState, useEffect } from "react";

export function WorkshopModeToggle() {
  const [isWorkshopMode, setIsWorkshopMode] = useState(false);

  useEffect(() => {
    // Check URL params or localStorage for workshop mode
    const params = new URLSearchParams(window.location.search);
    const workshopParam = params.get("workshop");
    const stored = localStorage.getItem("workshop-mode");
    
    if (workshopParam === "true" || stored === "true") {
      setIsWorkshopMode(true);
      document.documentElement.classList.add("workshop-mode");
    }
  }, []);

  const toggleWorkshopMode = () => {
    const newMode = !isWorkshopMode;
    setIsWorkshopMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("workshop-mode");
      localStorage.setItem("workshop-mode", "true");
      // Update URL without reload
      const url = new URL(window.location.href);
      url.searchParams.set("workshop", "true");
      window.history.pushState({}, "", url);
    } else {
      document.documentElement.classList.remove("workshop-mode");
      localStorage.removeItem("workshop-mode");
      // Remove workshop param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("workshop");
      window.history.pushState({}, "", url);
    }
  };

  return (
    <button
      onClick={toggleWorkshopMode}
      className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-neutral-900 text-white rounded-lg shadow-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
      aria-label="Toggle workshop mode"
    >
      {isWorkshopMode ? "Exit Workshop Mode" : "Workshop Mode"}
    </button>
  );
}

