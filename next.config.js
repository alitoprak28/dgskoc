/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // statik export'ta zorunlu
  trailingSlash: true,           // statik hosting'de yol sorunlarini onler
};

module.exports = nextConfig;
