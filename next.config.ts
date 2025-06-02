/**
 * @type {import('next').NextConfig}
 */

const nextConfig: import('next').NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig;
