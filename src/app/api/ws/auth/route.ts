// This route handler is a placeholder
// WebSocket connections are handled by the custom server.ts file
// The server.ts file handles WebSocket upgrades at /api/ws/auth

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "WebSocket endpoint - use ws:// protocol" },
    { status: 400 }
  );
}

