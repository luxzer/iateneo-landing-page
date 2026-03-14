import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/iateneo-landing-page",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
