const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  target: 'server',
  distDir: 'build/client',
  serverRuntimeConfig: {},
  // available to both client and server-side.
  env: {
    GRAPHQL_HOST: process.env.GRAPHQL_HOST
  }
})
