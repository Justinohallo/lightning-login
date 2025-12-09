"use client";

import { useState } from "react";

type LoggedInProps = {
  pubkey: string;
};

export default function LoggedIn({ pubkey }: LoggedInProps) {
  const [copied, setCopied] = useState(false);

  function handleLogout() {
    fetch("/api/auth/logout", { method: "POST" })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  }

  function copyPubkey() {
    navigator.clipboard.writeText(pubkey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Logged In!</h1>
        <p className="text-neutral-600">
          You have successfully authenticated with Lightning Login
        </p>
      </div>

      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-neutral-700">
            Public Key:
          </label>
          <button
            onClick={copyPubkey}
            className="text-sm px-3 py-1 bg-neutral-200 hover:bg-neutral-300 rounded transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="bg-white p-4 rounded border border-neutral-200 text-sm font-mono break-all overflow-x-auto">
          {pubkey}
        </pre>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-blue-900 mb-2">Session Information</h2>
        <p className="text-sm text-blue-800">
          Your session is stored in an httpOnly cookie. This public key serves as
          your unique identifier for this session.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

