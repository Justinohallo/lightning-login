import { NextResponse } from "next/server";
import { getPendingLogin } from "@/lib/store/pendingLogins";
import { getSession } from "@/lib/session/getSession";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const k1 = searchParams.get("k1");

    // Check session cookie first (most reliable)
    const session = await getSession();
    if (session) {
      console.log(`[Status] Session found: ${session.substring(0, 16)}...`);
      return NextResponse.json({
        authenticated: true,
        pubkey: session,
        source: "session"
      });
    }

    // Fallback to checking pending login store if k1 provided
    if (k1) {
      const pendingLogin = getPendingLogin(k1);
      if (!pendingLogin) {
        console.log(`[Status] No pending login found for k1: ${k1.substring(0, 8)}...`);
        return NextResponse.json({
          authenticated: false,
          k1: k1.substring(0, 8) + "...",
          source: "pending_store"
        });
      }

      if (pendingLogin.status === "authenticated" && pendingLogin.pubkey) {
        console.log(`[Status] Authenticated for k1: ${k1.substring(0, 8)}...`);
        return NextResponse.json({
          authenticated: true,
          pubkey: pendingLogin.pubkey,
          k1: k1.substring(0, 8) + "...",
          source: "pending_store"
        });
      }

      return NextResponse.json({
        authenticated: false,
        status: pendingLogin.status,
        k1: k1.substring(0, 8) + "...",
        source: "pending_store"
      });
    }

    // No k1 and no session
    return NextResponse.json({
      authenticated: false,
      source: "none"
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

