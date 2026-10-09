import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL lama WordPress tetap hidup setelah migrasi
  async redirects() {
    return [
      { source: "/portfolio/:slug", destination: "/proyek/:slug", permanent: true },
      { source: "/en/portfolio/:slug", destination: "/en/projects/:slug", permanent: true },
      { source: "/beranda", destination: "/", permanent: true },
      { source: "/en/home", destination: "/en", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
