import lnurl from "lnurl";

export function verifyAuthSignature(
  pubkey: string,
  sig: string,
  k1: string
): boolean {
  // lnurl.verifyAuthorizationSignature expects: (sig, k1, key)
  return lnurl.verifyAuthorizationSignature(sig, k1, pubkey);
}

