"use client";

import { useState, useEffect } from "react";

type AuthStep = {
  id: number;
  name: string;
  description: string;
  status: "pending" | "active" | "complete" | "error";
  payload?: Record<string, unknown>;
};

type DeveloperToolsProps = {
  k1: string | null;
  lnurl: string | null;
  currentStep: string;
};

export default function DeveloperTools({
  k1,
  lnurl,
  currentStep,
}: DeveloperToolsProps) {
  const [steps, setSteps] = useState<AuthStep[]>([
    {
      id: 1,
      name: "Generate Challenge",
      description: "Server generates a random 32-byte k1 challenge",
      status: "pending",
    },
    {
      id: 2,
      name: "Encode LNURL",
      description: "k1 and callback URL are encoded into LNURL format",
      status: "pending",
    },
    {
      id: 3,
      name: "Display QR Code",
      description: "Frontend renders QR code containing the LNURL",
      status: "pending",
    },
    {
      id: 4,
      name: "Wallet Scans QR",
      description: "User scans QR code with Lightning wallet",
      status: "pending",
    },
    {
      id: 5,
      name: "Wallet Signs Challenge",
      description: "Wallet signs k1 with user's private key",
      status: "pending",
    },
    {
      id: 6,
      name: "Callback Request",
      description: "Wallet sends GET request to callback URL with signature",
      status: "pending",
    },
    {
      id: 7,
      name: "Verify Signature",
      description: "Server verifies the signature using public key and k1",
      status: "pending",
    },
    {
      id: 8,
      name: "Create Session",
      description: "Server creates session cookie with authenticated pubkey",
      status: "pending",
    },
  ]);

  useEffect(() => {
    setSteps((prevSteps) => {
      const updatedSteps = prevSteps.map((step) => ({ ...step }));
      
      if (k1 && lnurl) {
        updatedSteps[0].status = "complete";
        updatedSteps[0].payload = { k1 };
        updatedSteps[1].status = "complete";
        updatedSteps[1].payload = { lnurl };
        updatedSteps[2].status = currentStep === "waiting" ? "active" : "complete";
        
        if (currentStep === "waiting") {
          updatedSteps[3].status = "active";
        }
      }

      if (currentStep === "authenticating") {
        updatedSteps[4].status = "complete";
        updatedSteps[5].status = "complete";
        updatedSteps[6].status = "active";
      }

      if (currentStep === "authenticated") {
        updatedSteps.forEach((step) => {
          if (step.status !== "complete") {
            step.status = "complete";
          }
        });
      }

      return updatedSteps;
    });
  }, [k1, lnurl, currentStep]);

  return (
    <div className="mt-8 border-t border-neutral-200 pt-8">
      <h2 className="text-2xl font-bold mb-4">Developer Tools</h2>
      <p className="text-neutral-600 mb-6">
        Step-by-step visualization of the LNURL-auth flow
      </p>

      <div className="space-y-4 mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border-2 ${
              step.status === "active"
                ? "border-yellow-400 bg-yellow-50"
                : step.status === "complete"
                ? "border-green-400 bg-green-50"
                : step.status === "error"
                ? "border-red-400 bg-red-50"
                : "border-neutral-200 bg-neutral-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-lg">{step.id}.</span>
                  <span className="font-semibold">{step.name}</span>
                  {step.status === "active" && (
                    <span className="text-xs px-2 py-1 bg-yellow-200 rounded">
                      Active
                    </span>
                  )}
                  {step.status === "complete" && (
                    <span className="text-xs px-2 py-1 bg-green-200 rounded">
                      ✓ Complete
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 ml-6">
                  {step.description}
                </p>
                {step.payload && (
                  <div className="mt-2 ml-6">
                    <details className="text-xs">
                      <summary className="cursor-pointer text-neutral-500 hover:text-neutral-700">
                        View Payload
                      </summary>
                      <pre className="mt-2 p-2 bg-white rounded border border-neutral-200 overflow-x-auto">
                        {JSON.stringify(step.payload, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Payload Inspector</h3>
        <div className="space-y-2 text-sm">
          {k1 && (
            <div>
              <span className="font-mono text-neutral-600">k1:</span>{" "}
              <span className="font-mono break-all">{k1}</span>
            </div>
          )}
          {lnurl && (
            <div>
              <span className="font-mono text-neutral-600">lnurl:</span>{" "}
              <span className="font-mono break-all text-xs">{lnurl}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

