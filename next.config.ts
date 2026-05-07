import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages project URL; omit during `next dev` so `/` works locally.
  ...(process.env.NODE_ENV === "production"
    ? { basePath: "/iateneo-landing-page" }
    : {}),
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
