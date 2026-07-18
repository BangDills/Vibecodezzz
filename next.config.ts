import type { NextConfig } from "next";

// Static-first export: builds the site into ./out, deployable as pure static files.
// Combined with Zod-validated data.json at build time, this keeps us zero-backend for MVP.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = "Vibecodezzz";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // GitHub Pages serves this repo under a subpath (/<repo>/), so we prepend
  // basePath only for the Pages build. Local/dev builds stay root-relative.
  ...(isGithubPages ? { basePath: `/${repo}` } : {}),
};

export default nextConfig;
