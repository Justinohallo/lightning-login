import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(): Promise<NextResponse> {
  (await cookies()).delete("ll-session");
  return NextResponse.json({ success: true });
}

