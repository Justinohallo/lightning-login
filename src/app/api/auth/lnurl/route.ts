import { NextResponse } from "next/server";
import { createPendingLogin } from "@/lib/store/pendingLogins";
import { encodeAuthURL } from "@/lib/lnurl/encodeLNURL";
import { env } from "@/lib/env";
import { generateK1 } from "@/lib/lnurl/generateK1";

export async function GET(): Promise<NextResponse> {
  try {
    // Generate a new challenge
    const k1 = generateK1();
    const callback = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;

    // Wallet of Satoshi and some other wallets expect the callback URL directly
    // with tag=login&k1=k1 as query parameters
    const callbackUrl = new URL(callback);
    callbackUrl.searchParams.set("tag", "login");
    callbackUrl.searchParams.set("k1", k1);

    const lnurl = encodeAuthURL(callbackUrl.toString());
    createPendingLogin(k1);

    console.log(`[LNURL] Generated challenge k1: ${k1.substring(0, 8)}...`);
    console.log(`[LNURL] Full k1: ${k1}`);
    console.log(`[LNURL] Callback URL: ${callbackUrl.toString()}`);
    console.log(`[LNURL] Encoded LNURL: ${lnurl.substring(0, 50)}...`);

    return NextResponse.json({ k1, lnurl });
  } catch (error) {
    console.error("[LNURL] Error generating challenge:", error);
    return NextResponse.json(
      {
        status: "ERROR",
        reason: "Failed to generate login challenge",
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

