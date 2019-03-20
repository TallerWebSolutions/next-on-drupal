const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const webpack = require('./config/webpack/webpack.next')

// webpack bundle analyzer.
// @see: https://github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer
const analyzer = [
  withBundleAnalyzer,
  {
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    }
  }
]

// core NextJS config.
const core = {
  webpack,
  target: process.env.DEPLOYING ? 'serverless' : 'server',
  distDir: 'build/client',
  serverRuntimeConfig: {},
  // available to both client and server-side.
  env: {
    GRAPHQL_HOST: process.env.GRAPHQL_HOST
  }
}

module.exports = withPlugins([analyzer, core])
