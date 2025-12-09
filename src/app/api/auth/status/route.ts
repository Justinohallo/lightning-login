import { NextResponse } from "next/server";
import { getPendingLogin } from "@/lib/store/pendingLogins";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const k1 = searchParams.get("k1");

  if (!k1) {
    return NextResponse.json(
      { error: "Missing k1 parameter" },
      { status: 400 }
    );
  }

  const pendingLogin = getPendingLogin(k1);
  if (!pendingLogin) {
    return NextResponse.json({
      authenticated: false,
    });
  }

  if (pendingLogin.status === "authenticated" && pendingLogin.pubkey) {
    return NextResponse.json({
      authenticated: true,
      pubkey: pendingLogin.pubkey,
    });
  }

  return NextResponse.json({
    authenticated: false,
    status: pendingLogin.status,
  });
}

