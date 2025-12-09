import lnurl from "lnurl";

export function verifyAuthSignature(
  pubkey: string,
  sig: string,
  k1: string
): boolean {
  return lnurl.verifyAuthorizationSignature(pubkey, sig, k1);
}

