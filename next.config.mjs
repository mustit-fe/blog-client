/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['objectstorage.ap-chuncheon-1.oraclecloud.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mustit-blog.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
};

export default nextConfig;
