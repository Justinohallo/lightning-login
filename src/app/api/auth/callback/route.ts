import { NextResponse } from "next/server";
import {
  getPendingLogin,
  completeLogin,
  removePendingLogin,
} from "@/lib/store/pendingLogins";
import { verifyAuthSignature } from "@/lib/lnurl/verifySignature";
import { createSession } from "@/lib/session/createSession";
import { broadcastAuthSuccess, broadcastAuthError } from "@/lib/websocket/authStatusServer";
import { env } from "@/lib/env";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const k1 = searchParams.get("k1");
  const key = searchParams.get("key");
  const sig = searchParams.get("sig");

  if (!k1 || !key || !sig) {
    return NextResponse.json(
      { status: "ERROR", reason: "Missing parameters" },
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
    broadcastAuthError(k1, "Invalid or expired k1");
    return NextResponse.json(
      { status: "ERROR", reason: "Invalid or expired k1" },
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
    broadcastAuthError(k1, "Challenge expired");
    return NextResponse.json(
      { status: "ERROR", reason: "Challenge expired" },
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

  const isValid = verifyAuthSignature(key, sig, k1);
  if (!isValid) {
    broadcastAuthError(k1, "Invalid signature");
    return NextResponse.json(
      { status: "ERROR", reason: "Invalid signature" },
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

  completeLogin(k1, key);
  await createSession(key);
  broadcastAuthSuccess(k1, key);
  removePendingLogin(k1);

  // LNURL-auth spec requires JSON response with status: "OK"
  return NextResponse.json(
    { status: "OK" },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
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

