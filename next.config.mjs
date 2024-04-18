/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
	swcMinify: true,
	images: {
		unoptimized: true
	},
  env: {
    ADMIN_API_KEY: process.env.ADMIN_API_KEY,
  },
};

export default nextConfig;
