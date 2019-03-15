const withCSS = require('@zeit/next-css')
const webpack = require('./config/webpack/webpack.common')

module.exports = withCSS({
  webpack,
  target: 'server',
  distDir: 'build/client',
  serverRuntimeConfig: {},
  // available to both client and server-side.
  env: {
    GRAPHQL_HOST: process.env.GRAPHQL_HOST
  }
})
