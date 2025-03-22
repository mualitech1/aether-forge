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
}

module.exports = nextConfig 