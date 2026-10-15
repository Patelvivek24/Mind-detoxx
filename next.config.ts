import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Required because the app has two root layouts: (site) and (admin).
    globalNotFound: true,
  },
};

export default nextConfig;
