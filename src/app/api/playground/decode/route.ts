import { NextResponse } from "next/server";
import lnurl from "lnurl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { lnurl: lnurlInput } = await request.json();
    if (!lnurlInput) {
      console.error("[Playground Decode] Missing lnurl parameter");
      return NextResponse.json(
        { error: "Missing lnurl parameter" },
        { status: 400 }
      );
    }
    
    console.log(`[Playground Decode] Decoding LNURL: ${lnurlInput.substring(0, 50)}...`);
    const decoded = lnurl.decode(lnurlInput);
    console.log(`[Playground Decode] Decoded successfully`);
    
    return NextResponse.json({ decoded });
  } catch (err) {
    console.error("[Playground Decode] Error:", err);
    return NextResponse.json(
      { 
        error: err instanceof Error ? err.message : "Decoding failed",
        details: err instanceof Error ? err.stack : undefined
      },
      { status: 400 }
    );
  }
}

