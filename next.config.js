/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dliobleuxirzpstdyzcn.supabase.co"],
  },
  env: {
    mapsKey: "",
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
