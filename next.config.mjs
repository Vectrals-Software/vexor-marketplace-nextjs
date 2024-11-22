/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'www.vectrals.com',
            'googleusercontent.com',
            'githubusercontent.com'
        ],
    }
};

export default nextConfig;
