import { cookies } from "next/headers";

export async function createSession(pubkey: string): Promise<void> {
  (await cookies()).set("ll-session", pubkey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

