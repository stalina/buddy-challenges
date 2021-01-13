module.exports = {
  pwa: {
    name: 'buddy-challenge'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/buddy-challenges/'
    : '/'
}