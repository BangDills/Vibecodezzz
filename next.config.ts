import type { NextConfig } from "next";

// Static-first export: builds the site into ./out, deployable as pure static files.
// Combined with Zod-validated data.json at build time, this keeps us zero-backend for MVP.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
