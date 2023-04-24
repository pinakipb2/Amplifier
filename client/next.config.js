/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack: (config) => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   };
  //   return config;
  // },
  output: "standalone",
  images: {
    domains: ["api.dicebear.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
