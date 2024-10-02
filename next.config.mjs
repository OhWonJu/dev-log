/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.notion.so",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.notionusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "common-sheet-da1.notion.site",
        pathname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
