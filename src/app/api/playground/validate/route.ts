import { NextResponse } from "next/server";
import lnurl from "lnurl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { pubkey, sig, k1 } = await request.json();
    if (!pubkey || !sig || !k1) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
    const isValid = lnurl.verifyAuthorizationSignature(pubkey, sig, k1);
    return NextResponse.json({ valid: isValid });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Validation failed" },
      { status: 400 }
    );
  }
}

