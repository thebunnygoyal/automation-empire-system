/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.automation-empire.com',
    NEXT_PUBLIC_N8N_URL: process.env.N8N_API_URL || 'https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io',
  },
}

module.exports = nextConfig