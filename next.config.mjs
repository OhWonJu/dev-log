/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.notion.so",
        pathname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
