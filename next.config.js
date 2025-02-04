/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dliobleuxirzpstdyzcn.supabase.co"],
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
