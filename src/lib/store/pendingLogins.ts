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
}

export function getPendingLogin(
  k1: string
): PendingLogin | undefined {
  const login = pendingLogins.get(k1);
  if (!login) {
    return undefined;
  }

  if (isExpired(login.created)) {
    login.status = "expired";
    return login;
  }

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

