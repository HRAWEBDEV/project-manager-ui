import type { NextConfig } from "next";
import { DEVELOPMENT } from "./utils/env";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_MODE !== DEVELOPMENT,
  },
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
