import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "" : ""; // Empty basePath for custom domain

const nextConfig: NextConfig = {
  // Gunakan static export untuk GitHub Pages
  output: "export",
  // basePath untuk custom domain (empty for root domain)
  basePath: basePath,
  // Disable image optimization untuk static export
  images: {
    unoptimized: true,
  },
  // Expose basePath ke client-side environment
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "giorbalitour.com",
          },
        ],
        destination: "https://www.giorbalitour.com/:path*",
        permanent: true,
      },
      // Redirect old GitHub Pages to custom domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "giormalik.github.io",
          },
        ],
        destination: "https://www.giorbalitour.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
