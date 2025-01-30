/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dliobleuxirzpstdyzcn.supabase.co"],
  },
  env: {
    mapsKey: "AIzaSyDiCt-GiJoUl6qF42Ovi6ufaqCPFMPso0c",
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
