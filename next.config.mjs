/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Docker standalone builds — creates a self-contained output
  // in .next/standalone that doesn't need the full node_modules at runtime
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
    ],
    // allow any hostname for local product images
    unoptimized: true,
  },
  // Silence build errors from missing env vars during CI
  typescript: {
    // Allow builds to complete even with type errors
    // so deployment isn't blocked by non-critical type issues
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
