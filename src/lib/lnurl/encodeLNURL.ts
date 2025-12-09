import lnurl from "lnurl";

export function encodeAuthURL(url: string): string {
  // Encode the URL to bech32 format
  return lnurl.encode(url);
}

