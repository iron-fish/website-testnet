module.exports = {
  images: {
    domains: ['cdnjs.cloudflare.com'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
      ],
    },
  ],
}
