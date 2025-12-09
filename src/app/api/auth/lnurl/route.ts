import { NextResponse } from "next/server";
import { generateK1 } from "@/lib/lnurl/generateK1";
import { encodeAuthURL } from "@/lib/lnurl/encodeLNURL";
import { createPendingLogin, getPendingLogin } from "@/lib/store/pendingLogins";
import { env } from "@/lib/env";

export async function GET(): Promise<NextResponse> {
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

  return NextResponse.json({ k1, lnurl });
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

