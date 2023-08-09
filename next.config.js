/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tim-nestjs-public.s3.ap-southeast-1.amazonaws.com',
                port: ''
            },
        ],
    },
}

module.exports = nextConfig
