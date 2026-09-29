import type { NextConfig } from "next";
import { UNSPLASH_QUERY } from "./src/lib/catalog";

const nextConfig: NextConfig = {
  images: {
    // Sample catalogue photos (src/lib/catalog.ts). Only Unsplash photo paths
    // at the one fixed size the catalogue requests are optimized.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search: UNSPLASH_QUERY,
      },
    ],
  },
};

export default nextConfig;
