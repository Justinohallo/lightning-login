import { NextResponse } from "next/server";
import lnurl from "lnurl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { k1, callback } = await request.json();
    if (!k1 || !callback) {
      const missing = [];
      if (!k1) missing.push("k1");
      if (!callback) missing.push("callback");
      console.error(`[Playground Encode] Missing parameters: ${missing.join(", ")}`);
      return NextResponse.json(
        { error: `Missing required parameters: ${missing.join(", ")}` },
        { status: 400 }
      );
    }
    
    console.log(`[Playground Encode] Encoding - k1: ${k1.substring(0, 8)}..., callback: ${callback}`);
    const url = new URL(callback);
    url.searchParams.set("tag", "login");
    url.searchParams.set("k1", k1);
    const encoded = lnurl.encode(url.toString());
    console.log(`[Playground Encode] Encoded successfully`);
    
    return NextResponse.json({ encoded });
  } catch (err) {
    console.error("[Playground Encode] Error:", err);
    return NextResponse.json(
      { 
        error: err instanceof Error ? err.message : "Encoding failed",
        details: err instanceof Error ? err.stack : undefined
      },
      { status: 400 }
    );
  }
}

