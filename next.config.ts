import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow better-sqlite3 and other native modules in server components
  serverExternalPackages: ["better-sqlite3"],

  turbopack: {
    root: __dirname,
  },

  // Experimental features
  experimental: {
    // Optimize server action bundle
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
