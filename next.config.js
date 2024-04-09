const nextBundleAnalyzer = require('@next/bundle-analyzer');
const { i18n } = require('./next-i18next.config');

// TODO Remove 'unsafe-'s when nonce technique is implemented for Google Tag Manager
const contentSecurityPolicy = `
upgrade-insecure-requests;

default-src 'self';

script-src 'self' 'unsafe-inline' 'wasm-eval' 'unsafe-eval' https://vercel.live;

style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;

font-src 'self' https://fonts.gstatic.com https://assets.vercel.com;

img-src 'self' data: https://assets.vercel.com https://*.walletconnect.com;

connect-src 'self' wss://*.pusher.com https://vitals.vercel-insights.com wss://*.bridge.walletconnect.org wss://*.walletconnect.org wss://*.walletconnect.com wss://www.walletlink.org wss://*.pusher.com https://*.walletconnect.com https://*.neobase.one;

frame-src 'self' https://vercel.live https://*.walletconnect.com;

media-src 'self';

frame-ancestors 'none';

object-src 'none';
`;

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // TODO Delete this header when 'unsafe-inline's removed from CSP
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload', // 2 years
  },
  {
    key: 'Permissions-Policy',
    value: 'autoplay=(), fullscreen=()', // https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin', // https://scotthelme.co.uk/a-new-security-header-referrer-policy/
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            filenameCase: 'kebab',
            memo: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  // StrictMode renders components twice (in dev environment only) in order to detect any problems with your code and warn you about them (which can be quite useful).
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  pageExtensions: [
    'page.tsx',
    'api.ts',
  ],
  rewrites: async () => {
    const rewrites = [
      {
        source: '/api/:slug*',
        destination: `${process.env.NEXT_PUBLIC_REST_URL}:slug*`,
      },
    ];

    return rewrites;
  },
  headers: async () => {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
      ];
    }

    return [];
  },
  i18n,
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
