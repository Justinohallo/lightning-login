type PendingLogin = {
  created: number;
  pubkey: string | null;
  status: "pending" | "authenticated" | "expired";
};

const pendingLogins = new Map<string, PendingLogin>();

const K1_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

function isExpired(created: number): boolean {
  return Date.now() - created > K1_EXPIRY_MS;
}

export function createPendingLogin(k1: string): void {
  pendingLogins.set(k1, {
    created: Date.now(),
    pubkey: null,
    status: "pending",
  });
  console.log(`[Store] Created pending login for k1: ${k1.substring(0, 8)}... (total pending: ${pendingLogins.size})`);
}

export function getPendingLogin(
  k1: string
): PendingLogin | undefined {
  console.log(`[Store] Looking up k1: ${k1.substring(0, 8)}... (total pending: ${pendingLogins.size})`);
  
  // Log all current k1s for debugging
  if (pendingLogins.size > 0) {
    const currentK1s = Array.from(pendingLogins.keys()).map(k => k.substring(0, 8) + "...");
    console.log(`[Store] Current pending k1s: ${currentK1s.join(", ")}`);
  }
  
  const login = pendingLogins.get(k1);
  if (!login) {
    console.error(`[Store] k1 not found: ${k1.substring(0, 8)}...`);
    return undefined;
  }

  if (isExpired(login.created)) {
    const age = Date.now() - login.created;
    console.error(`[Store] k1 expired: ${k1.substring(0, 8)}... (age: ${Math.round(age / 1000)}s)`);
    login.status = "expired";
    return login;
  }

  console.log(`[Store] Found valid pending login for k1: ${k1.substring(0, 8)}...`);
  return login;
}

export function completeLogin(k1: string, pubkey: string): void {
  const login = pendingLogins.get(k1);
  if (login) {
    login.pubkey = pubkey;
    login.status = "authenticated";
  }
}

export function removePendingLogin(k1: string): void {
  pendingLogins.delete(k1);
}

export function getAllPendingLogins(): Map<string, PendingLogin> {
  return pendingLogins;
}

