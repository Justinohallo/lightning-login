import { cookies } from "next/headers";

export async function getSession(): Promise<string | null> {
  return (await cookies()).get("ll-session")?.value || null;
}

