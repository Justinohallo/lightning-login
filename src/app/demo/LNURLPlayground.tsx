"use client";

import { useState } from "react";

export default function LNURLPlayground() {
  const [decoderInput, setDecoderInput] = useState("");
  const [decodedResult, setDecodedResult] = useState<string | null>(null);
  const [decoderError, setDecoderError] = useState<string | null>(null);

  const [encoderK1, setEncoderK1] = useState("");
  const [encoderCallback, setEncoderCallback] = useState("");
  const [encodedResult, setEncodedResult] = useState<string | null>(null);

  const [validatorPubkey, setValidatorPubkey] = useState("");
  const [validatorSig, setValidatorSig] = useState("");
  const [validatorK1, setValidatorK1] = useState("");
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const [simulatorK1, setSimulatorK1] = useState("");
  const [simulatorPubkey, setSimulatorPubkey] = useState("");
  const [simulatorResult, setSimulatorResult] = useState<string | null>(null);

  async function decodeLNURL() {
    try {
      setDecoderError(null);
      const res = await fetch("/api/playground/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lnurl: decoderInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDecoderError(data.error);
        setDecodedResult(null);
        return;
      }
      setDecodedResult(JSON.stringify(data.decoded, null, 2));
    } catch (err) {
      setDecoderError(err instanceof Error ? err.message : "Decoding failed");
      setDecodedResult(null);
    }
  }

  async function encodeLNURL() {
    try {
      if (!encoderK1 || !encoderCallback) {
        setEncodedResult("Error: k1 and callback are required");
        return;
      }
      const res = await fetch("/api/playground/encode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ k1: encoderK1, callback: encoderCallback }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEncodedResult(`Error: ${data.error}`);
        return;
      }
      setEncodedResult(data.encoded);
    } catch (err) {
      setEncodedResult(
        `Error: ${err instanceof Error ? err.message : "Encoding failed"}`
      );
    }
  }

  async function validateSignature() {
    try {
      if (!validatorPubkey || !validatorSig || !validatorK1) {
        setValidationResult("Error: All fields are required");
        return;
      }
      const res = await fetch("/api/playground/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pubkey: validatorPubkey,
          sig: validatorSig,
          k1: validatorK1,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setValidationResult(`Error: ${data.error}`);
        return;
      }
      setValidationResult(
        data.valid
          ? "✓ Signature is valid"
          : "✗ Signature is invalid"
      );
    } catch (err) {
      setValidationResult(
        `Error: ${err instanceof Error ? err.message : "Validation failed"}`
      );
    }
  }

  async function simulateFlow() {
    try {
      if (!simulatorK1 || !simulatorPubkey) {
        setSimulatorResult("Error: k1 and pubkey are required");
        return;
      }

      // Generate a mock signature (this won't be valid, but shows the flow)
      const mockSig = "mock_signature_" + Date.now();
      const res = await fetch("/api/playground/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pubkey: simulatorPubkey,
          sig: mockSig,
          k1: simulatorK1,
        }),
      });
      const data = await res.json();
      const isValid = res.ok && data.valid;

      setSimulatorResult(
        `Simulated flow:\n` +
          `k1: ${simulatorK1}\n` +
          `pubkey: ${simulatorPubkey}\n` +
          `signature: ${mockSig}\n` +
          `validation: ${isValid ? "valid" : "invalid (expected for mock signature)"}\n\n` +
          `Note: This is a simulation. Real signatures require a wallet's private key.`
      );
    } catch (err) {
      setSimulatorResult(
        `Error: ${err instanceof Error ? err.message : "Simulation failed"}`
      );
    }
  }

  return (
    <div className="mt-8 border-t border-neutral-200 pt-8">
      <h2 className="text-2xl font-bold mb-4">LNURL Playground</h2>
      <p className="text-neutral-600 mb-6">
        Tools to decode, encode, validate, and simulate LNURL-auth flows
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Decoder */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <h3 className="font-semibold mb-3">LNURL Decoder</h3>
          <textarea
            value={decoderInput}
            onChange={(e) => setDecoderInput(e.target.value)}
            placeholder="Paste LNURL here..."
            className="w-full p-2 border border-neutral-300 rounded mb-2 font-mono text-sm"
            rows={3}
          />
          <button
            onClick={decodeLNURL}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
          >
            Decode
          </button>
          {decoderError && (
            <div className="text-red-600 text-sm mb-2">{decoderError}</div>
          )}
          {decodedResult && (
            <pre className="bg-white p-2 rounded border border-neutral-200 text-xs overflow-x-auto">
              {decodedResult}
            </pre>
          )}
        </div>

        {/* Encoder */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <h3 className="font-semibold mb-3">LNURL Encoder</h3>
          <input
            type="text"
            value={encoderK1}
            onChange={(e) => setEncoderK1(e.target.value)}
            placeholder="k1 (hex string)"
            className="w-full p-2 border border-neutral-300 rounded mb-2 font-mono text-sm"
          />
          <input
            type="text"
            value={encoderCallback}
            onChange={(e) => setEncoderCallback(e.target.value)}
            placeholder="Callback URL"
            className="w-full p-2 border border-neutral-300 rounded mb-2 text-sm"
          />
          <button
            onClick={encodeLNURL}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
          >
            Encode
          </button>
          {encodedResult && (
            <div className="mt-2">
              <div className="text-sm font-semibold mb-1">Encoded LNURL:</div>
              <pre className="bg-white p-2 rounded border border-neutral-200 text-xs break-all overflow-x-auto">
                {encodedResult}
              </pre>
            </div>
          )}
        </div>

        {/* Signature Validator */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Signature Validator</h3>
          <input
            type="text"
            value={validatorPubkey}
            onChange={(e) => setValidatorPubkey(e.target.value)}
            placeholder="Public Key"
            className="w-full p-2 border border-neutral-300 rounded mb-2 font-mono text-sm"
          />
          <input
            type="text"
            value={validatorSig}
            onChange={(e) => setValidatorSig(e.target.value)}
            placeholder="Signature"
            className="w-full p-2 border border-neutral-300 rounded mb-2 font-mono text-sm"
          />
          <input
            type="text"
            value={validatorK1}
            onChange={(e) => setValidatorK1(e.target.value)}
            placeholder="k1 (challenge)"
            className="w-full p-2 border border-neutral-300 rounded mb-2 font-mono text-sm"
          />
          <button
            onClick={validateSignature}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
          >
            Validate
          </button>
          {validationResult && (
            <div className="mt-2 p-2 bg-white rounded border border-neutral-200 text-sm">
              {validationResult}
            </div>
          )}
        </div>

        {/* Flow Simulator */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Flow Simulator</h3>
          <input
            type="text"
            value={simulatorK1}
            onChange={(e) => setSimulatorK1(e.target.value)}
            placeholder="k1 (challenge)"
            className="w-full p-2 border border-neutral-300 rounded mb-2 font-mono text-sm"
          />
          <input
            type="text"
            value={simulatorPubkey}
            onChange={(e) => setSimulatorPubkey(e.target.value)}
            placeholder="Public Key"
            className="w-full p-2 border border-neutral-300 rounded mb-2 font-mono text-sm"
          />
          <button
            onClick={simulateFlow}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mb-2"
          >
            Simulate
          </button>
          {simulatorResult && (
            <pre className="mt-2 bg-white p-2 rounded border border-neutral-200 text-xs whitespace-pre-wrap">
              {simulatorResult}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

