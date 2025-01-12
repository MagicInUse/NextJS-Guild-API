/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export'
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig