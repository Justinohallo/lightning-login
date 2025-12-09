declare module "lnurl" {
  interface LNURLOptions {
    tag: string;
    k1?: string;
    callback?: string;
    [key: string]: unknown;
  }

  function encode(options: LNURLOptions): string;
  function decode(lnurl: string): LNURLOptions;
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

