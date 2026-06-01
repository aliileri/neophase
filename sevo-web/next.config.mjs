/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/sevo',
  assetPrefix: '/sevo',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/sevo',
  },
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
