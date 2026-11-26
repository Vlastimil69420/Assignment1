import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "b00176858.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
