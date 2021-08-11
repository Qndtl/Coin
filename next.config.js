module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.coingecko.com']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page/1',
        permanent: true
      }
    ]
  }
}
