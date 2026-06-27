const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {removeConsole: process.env.NODE_ENV === 'production'},
  images: {unoptimized: true, domains: ['localhost', 'cmms.local']},
  staticPageGenerationTimeout: 1000,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false
};
module.exports = nextConfig;