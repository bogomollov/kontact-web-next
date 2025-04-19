import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
  },
};

export default nextConfig;
