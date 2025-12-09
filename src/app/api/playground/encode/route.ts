import { NextResponse } from "next/server";
import lnurl from "lnurl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { k1, callback } = await request.json();
    if (!k1 || !callback) {
      return NextResponse.json(
        { error: "Missing k1 or callback parameter" },
        { status: 400 }
      );
    }
    const url = new URL(callback);
    url.searchParams.set("tag", "login");
    url.searchParams.set("k1", k1);
    const encoded = lnurl.encode(url.toString());
    return NextResponse.json({ encoded });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Encoding failed" },
      { status: 400 }
    );
  }
}

