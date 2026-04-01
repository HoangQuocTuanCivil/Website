import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required for Sanity Studio
  transpilePackages: ['sanity'],
}

export default nextConfig
