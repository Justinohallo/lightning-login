"use client";

import { useState } from "react";
import LoginPanel from "./LoginPanel";
import DeveloperTools from "./DeveloperTools";
import LNURLPlayground from "./LNURLPlayground";

type AuthStep = "idle" | "generating" | "waiting" | "authenticating" | "authenticated";

export default function DemoContent() {
  const [k1, setK1] = useState<string | null>(null);
  const [lnurl, setLnurl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<AuthStep>("idle");

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

