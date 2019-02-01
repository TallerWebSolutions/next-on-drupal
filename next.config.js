const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  target: 'serverless',
  serverRuntimeConfig: {},
  // available to both client and server-side.
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    GRAPHQL_HOST: process.env.GRAPHQL_HOST
  }
})
