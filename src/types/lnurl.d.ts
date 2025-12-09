declare module "lnurl" {
  interface LNURLOptions {
    tag: string;
    k1?: string;
    callback?: string;
    [key: string]: unknown;
  }

  function encode(url: string): string;
  function decode(lnurl: string): string;
  function verifyAuthorizationSignature(
    pubkey: string,
    sig: string,
    k1: string
  ): boolean;

  const lnurl: {
    encode: typeof encode;
    decode: typeof decode;
    verifyAuthorizationSignature: typeof verifyAuthorizationSignature;
  };

  export default lnurl;
}

