/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qtn9r5czq172ihok.public.blob.vercel-storage.com',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },
};


export default nextConfig;
