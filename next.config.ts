import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "ai-website-cloner-arabic";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
