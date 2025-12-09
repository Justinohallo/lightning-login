import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "lnurl",
    "lightning-backends",
    "ws",
  ],
};

export default nextConfig;
