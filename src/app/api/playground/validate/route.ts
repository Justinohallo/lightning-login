import { NextResponse } from "next/server";
import lnurl from "lnurl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { pubkey, sig, k1 } = await request.json();
    if (!pubkey || !sig || !k1) {
      const missing = [];
      if (!pubkey) missing.push("pubkey");
      if (!sig) missing.push("sig");
      if (!k1) missing.push("k1");
      console.error(`[Playground Validate] Missing parameters: ${missing.join(", ")}`);
      return NextResponse.json(
        { error: `Missing required parameters: ${missing.join(", ")}` },
        { status: 400 }
      );
    }
    
    console.log(`[Playground Validate] Validating signature - k1: ${k1.substring(0, 8)}..., pubkey: ${pubkey.substring(0, 16)}...`);
    // lnurl.verifyAuthorizationSignature expects: (sig, k1, key)
    const isValid = lnurl.verifyAuthorizationSignature(sig, k1, pubkey);
    console.log(`[Playground Validate] Validation result: ${isValid ? "valid" : "invalid"}`);
    
    return NextResponse.json({ 
      valid: isValid,
      k1: k1.substring(0, 8) + "...",
      pubkey: pubkey.substring(0, 16) + "..."
    });
  } catch (err) {
    console.error("[Playground Validate] Error:", err);
    return NextResponse.json(
      { 
        error: err instanceof Error ? err.message : "Validation failed",
        details: err instanceof Error ? err.stack : undefined
      },
      { status: 400 }
    );
  }
}

