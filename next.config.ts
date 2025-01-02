import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"], // TMDB's domain
  },
};

export default nextConfig;
