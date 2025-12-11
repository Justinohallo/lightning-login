import {
  completeLogin,
  getPendingLogin,
  removePendingLogin,
} from "@/lib/store/pendingLogins";

import { NextResponse } from "next/server";
import { createSession } from "@/lib/session/createSession";
import { env } from "@/lib/env";
import { verifyAuthSignature } from "@/lib/lnurl/verifySignature";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);

    const k1 = searchParams.get("k1");
    const key = searchParams.get("key");
    const sig = searchParams.get("sig");

    console.log(`[Callback] Received request - k1: ${k1 ? k1.substring(0, 8) + "..." : "missing"}, key: ${key ? key.substring(0, 16) + "..." : "missing"}, sig: ${sig ? sig.substring(0, 16) + "..." : "missing"}`);

    if (!k1 || !key || !sig) {
      const missing = [];
      if (!k1) missing.push("k1");
      if (!key) missing.push("key");
      if (!sig) missing.push("sig");

      console.error(`[Callback] Missing parameters: ${missing.join(", ")}`);
      return NextResponse.json(
        {
          status: "ERROR",
          reason: `Missing required parameters: ${missing.join(", ")}`,
          received: { k1: !!k1, key: !!key, sig: !!sig }
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    const pendingLogin = getPendingLogin(k1);
    if (!pendingLogin) {
      console.error(`[Callback] Invalid or expired k1: ${k1.substring(0, 8)}...`);
      console.error(`[Callback] Full k1 received: ${k1}`);
      console.error(`[Callback] This might indicate the k1 was never stored, or the store was cleared (common in serverless/multi-instance deployments)`);
      return NextResponse.json(
        {
          status: "ERROR",
          reason: "Invalid or expired k1. The challenge may have been generated on a different server instance.",
          k1: k1.substring(0, 8) + "...",
          hint: "In-memory storage doesn't persist across server instances. Consider using a shared store (Redis, database, etc.)"
        },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    if (pendingLogin.status === "expired") {
      console.error(`[Callback] Challenge expired for k1: ${k1.substring(0, 8)}...`);
      return NextResponse.json(
        {
          status: "ERROR",
          reason: "Challenge expired",
          k1: k1.substring(0, 8) + "..."
        },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    console.log(`[Callback] Verifying signature for k1: ${k1.substring(0, 8)}...`);
    const isValid = verifyAuthSignature(key, sig, k1);

    if (!isValid) {
      console.error(`[Callback] Invalid signature for k1: ${k1.substring(0, 8)}..., key: ${key.substring(0, 16)}...`);
      return NextResponse.json(
        {
          status: "ERROR",
          reason: "Invalid signature",
          k1: k1.substring(0, 8) + "...",
          key: key.substring(0, 16) + "..."
        },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    console.log(`[Callback] Authentication successful for k1: ${k1.substring(0, 8)}..., key: ${key.substring(0, 16)}...`);
    completeLogin(k1, key);
    await createSession(key);
    removePendingLogin(k1);

    // LNURL-auth spec requires JSON response with status: "OK"
    // But we can also redirect to demo page for better UX
    const redirectUrl = `${env.NEXT_PUBLIC_BASE_URL}/demo?auth=success`;

    return NextResponse.json(
      {
        status: "OK",
        redirect: redirectUrl
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("[Callback] Unexpected error:", error);
    return NextResponse.json(
      {
        status: "ERROR",
        reason: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

