"use client";

import { useState, useEffect } from "react";
import { LoginPanel } from "./LoginPanel";
import DeveloperTools from "./DeveloperTools";
import LNURLPlayground from "./LNURLPlayground";

type AuthStep = "idle" | "generating" | "waiting" | "authenticating" | "authenticated";

export default function DemoContent() {
  const [k1, setK1] = useState<string | null>(null);
  const [lnurl, setLnurl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<AuthStep>("idle");

  // Check for auth success query param and verify session
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "success") {
      // Verify session exists, then reload to show logged in state
      fetch("/api/auth/status")
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            console.log("[DemoContent] Auth success confirmed, reloading...");
            window.location.href = "/demo";
          }
        });
    }
  }, []);

  // Periodically check if user got logged in (for cases where wallet doesn't redirect)
  useEffect(() => {
    if (currentStep === "waiting") {
      const checkInterval = setInterval(async () => {
        try {
          const res = await fetch("/api/auth/status");
          const data = await res.json();
          if (data.authenticated) {
            console.log("[DemoContent] Session detected, reloading page...");
            clearInterval(checkInterval);
            window.location.reload();
          }
        } catch (err) {
          console.error("[DemoContent] Session check error:", err);
        }
      }, 2000);

      return () => clearInterval(checkInterval);
    }
  }, [currentStep]);

  function handleDataChange(data: {
    k1: string | null;
    lnurl: string | null;
    step: AuthStep;
  }) {
    setK1(data.k1);
    setLnurl(data.lnurl);
    setCurrentStep(data.step);
  }

  return (
    <>
      <LoginPanel onDataChange={handleDataChange} />
      {k1 && lnurl && (
        <DeveloperTools k1={k1} lnurl={lnurl} currentStep={currentStep} />
      )}
      <LNURLPlayground />
    </>
  );
}

