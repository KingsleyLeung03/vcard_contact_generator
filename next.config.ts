/**
 * @type {import('next').NextConfig}
 */

const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig;
