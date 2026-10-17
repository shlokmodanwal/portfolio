import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use React 19 strict mode
  reactStrictMode: true,

  // Hide the Next.js dev indicator badge ("N" icon) in dev
  devIndicators: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote patterns here as needed when adding external images
    remotePatterns: [],
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features
  experimental: {
    // Optimize package imports for performance
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
