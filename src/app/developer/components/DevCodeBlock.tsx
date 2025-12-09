"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

type DevCodeBlockProps = {
  title: string;
  description?: string;
  language: string;
  code: string;
};

export function DevCodeBlock({
  title,
  description,
  language,
  code,
}: DevCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-6 border border-neutral-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-neutral-50 px-4 py-2 border-b border-neutral-200">
        <div>
          <h4 className="font-semibold text-sm text-neutral-900">{title}</h4>
          {description && (
            <p className="text-xs text-neutral-600 mt-1">{description}</p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

