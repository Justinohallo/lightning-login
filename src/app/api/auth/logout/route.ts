import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("ll-session");
    
    if (session) {
      console.log(`[Logout] Logging out session: ${session.value.substring(0, 16)}...`);
    }
    
    cookieStore.delete("ll-session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Logout] Error during logout:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

