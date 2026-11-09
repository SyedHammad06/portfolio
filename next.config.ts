import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  devIndicators: false,
  partialPrefetching: true,
  // The OG/icon routes read fonts from disk at runtime; make sure Vercel bundles them.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/assets/fonts/**/*"],
    "/icon": ["./src/assets/fonts/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
