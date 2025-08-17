import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',

});

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN_3 || 'fakeimg.pl',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN_1 || 'app.sanatyariran.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN_2 || 'mag.sanatyariran.com',
                pathname: '/**',
            },
        ],
    },
};

export default withPWA(nextConfig);
