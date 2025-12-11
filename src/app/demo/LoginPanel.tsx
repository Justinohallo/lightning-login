"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type AuthStep = "idle" | "generating" | "waiting" | "authenticating" | "authenticated";

type LoginPanelProps = {
  onDataChange?: (data: { k1: string | null; lnurl: string | null; step: AuthStep }) => void;
};

export function LoginPanel({ onDataChange }: LoginPanelProps) {
  const [qr, setQr] = useState<string>("");
  const [k1, setK1] = useState<string | null>(null);
  const [lnurl, setLnurl] = useState<string | null>(null);
  const [step, setStep] = useState<AuthStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const pollerRef = useRef<{
    statusInterval: ReturnType<typeof setInterval> | null;
    sessionInterval: ReturnType<typeof setInterval> | null;
    timeout: ReturnType<typeof setTimeout> | null;
    stopped: boolean;
  }>({
    statusInterval: null,
    sessionInterval: null,
    timeout: null,
    stopped: false,
  });

  useEffect(() => {
    if (onDataChange) {
      onDataChange({ k1, lnurl, step });
    }
  }, [k1, lnurl, step, onDataChange]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  async function start() {
    try {
      stopPolling();
      setStep("generating");
      setError(null);
      setQr("");

      const res = await fetch("/api/auth/lnurl");
      if (!res.ok) {
        throw new Error("Failed to generate login challenge");
      }

      const data = await res.json();
      setK1(data.k1);
      setLnurl(data.lnurl);
      const qrData = await QRCode.toDataURL(data.lnurl);
      setQr(qrData);
      setStep("waiting");

      // WebSockets aren't supported on Vercel for this app; use polling.
      startPolling(data.k1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start login");
      setStep("idle");
    }
  }

  function stopPolling() {
    const poller = pollerRef.current;
    poller.stopped = true;
    if (poller.statusInterval) clearInterval(poller.statusInterval);
    if (poller.sessionInterval) clearInterval(poller.sessionInterval);
    if (poller.timeout) clearTimeout(poller.timeout);
    poller.statusInterval = null;
    poller.sessionInterval = null;
    poller.timeout = null;
  }

  function startPolling(k1Value: string) {
    const poller = pollerRef.current;
    poller.stopped = false;

    poller.statusInterval = setInterval(async () => {
      try {
        // Check both with k1 and without (to check session cookie)
        const res = await fetch(`/api/auth/status?k1=${k1Value}`);
        const data = await res.json();
        if (data.authenticated) {
          stopPolling();
          setStep("authenticated");
          console.log("[LoginPanel] Authentication detected via polling, reloading...");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);

    // Also check session cookie periodically (in case k1 store doesn't work)
    poller.sessionInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/auth/status`);
        const data = await res.json();
        if (data.authenticated) {
          stopPolling();
          setStep("authenticated");
          console.log("[LoginPanel] Session detected, reloading...");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (err) {
        console.error("Session check error:", err);
      }
    }, 2000);

    // Cleanup after 5 minutes
    poller.timeout = setTimeout(() => {
      if (!poller.stopped) {
        stopPolling();
        setError("Login timeout - please try again");
        setStep("idle");
      }
    }, 5 * 60 * 1000);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login with Lightning</h1>
      <p className="text-neutral-600 mb-6">
        Authenticate using your Lightning wallet with LNURL-auth
      </p>

      {step === "idle" && (
        <button
          onClick={start}
          className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        >
          Generate Login QR Code
        </button>
      )}

      {step === "generating" && (
        <div className="text-neutral-600">Generating challenge...</div>
      )}

      {qr && step === "waiting" && (
        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg border border-neutral-200 inline-block">
            <img src={qr} alt="LNURL-auth QR Code" className="w-64 h-64" />
          </div>
          <p className="mt-4 text-neutral-600">
            Scan with Breez, Alby, or any LNURL-auth compatible wallet.
          </p>
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm font-mono text-neutral-700 break-all">
              k1: {k1}
            </p>
          </div>
        </div>
      )}

      {step === "authenticated" && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold">
            ✓ Authentication successful! Redirecting...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => {
              stopPolling();
              setError(null);
              setStep("idle");
              setK1(null);
              setLnurl(null);
              setQr("");
            }}
            className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

