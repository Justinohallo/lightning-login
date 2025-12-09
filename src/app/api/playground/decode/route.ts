import { NextResponse } from "next/server";
import lnurl from "lnurl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { lnurl: lnurlInput } = await request.json();
    if (!lnurlInput) {
      return NextResponse.json(
        { error: "Missing lnurl parameter" },
        { status: 400 }
      );
    }
    const decoded = lnurl.decode(lnurlInput);
    return NextResponse.json({ decoded });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Decoding failed" },
      { status: 400 }
    );
  }
}

