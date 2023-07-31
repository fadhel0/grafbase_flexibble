/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com']
    },

    experimental: {
        serverComponentsExternalPackages: ['cloudianry', 'garphql-request']
    }
}

module.exports = nextConfig
