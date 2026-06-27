// @ts-check
const withNextIntl = require('next-intl/plugin')(
  './lib/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'CMMS Factory',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
};

module.exports = withNextIntl(nextConfig);
