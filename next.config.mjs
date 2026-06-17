/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "framer-motion",
      "gsap",
      "@gsap/react",
    ],
  },
};

export default nextConfig;