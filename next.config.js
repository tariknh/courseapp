/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dliobleuxirzpstdyzcn.supabase.co"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  env: {
    mapsKey: process.env.MAPS_KEY,
  },
  async redirects() {
    return [
      {
        source: "/manage/:course",
        destination: "/manage/:course/overview",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
