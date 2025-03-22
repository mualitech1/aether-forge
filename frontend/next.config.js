/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: [
      'images.unsplash.com', 
      'nuhhtzuykjbdkhyhvewg.supabase.co', // Supabase storage
      'spline.design' // For 3D models
    ],
    unoptimized: true,
  },
  // Set TypeScript to ignore build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src')
    };
    return config;
  }
}

module.exports = nextConfig 