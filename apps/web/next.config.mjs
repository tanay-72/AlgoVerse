/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@algoverse/shared-types'],
  eslint: {
    dirs: ['src'],
  },
};

export default nextConfig;
