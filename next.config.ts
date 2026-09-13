import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.119",
        port: "8080",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
