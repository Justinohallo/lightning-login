import { NextResponse } from "next/server";
import { getPendingLogin } from "@/lib/store/pendingLogins";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const k1 = searchParams.get("k1");

    if (!k1) {
      console.error("[Status] Missing k1 parameter");
      return NextResponse.json(
        {
          error: "Missing k1 parameter",
          authenticated: false
        },
        { status: 400 }
      );
    }

    const pendingLogin = getPendingLogin(k1);
    if (!pendingLogin) {
      console.log(`[Status] No pending login found for k1: ${k1.substring(0, 8)}...`);
      return NextResponse.json({
        authenticated: false,
        k1: k1.substring(0, 8) + "..."
      });
    }

    if (pendingLogin.status === "authenticated" && pendingLogin.pubkey) {
      console.log(`[Status] Authenticated for k1: ${k1.substring(0, 8)}...`);
      return NextResponse.json({
        authenticated: true,
        pubkey: pendingLogin.pubkey,
        k1: k1.substring(0, 8) + "..."
      });
    }

    return NextResponse.json({
      authenticated: false,
      status: pendingLogin.status,
      k1: k1.substring(0, 8) + "..."
    });
  } catch (error) {
    console.error("[Status] Error checking status:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        authenticated: false,
        errorMessage: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

