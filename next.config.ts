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
  images: {
    // Foto yang diunggah lewat admin disimpan di Supabase Storage
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
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
