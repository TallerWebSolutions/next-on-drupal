const withPlugins = require('next-compose-plugins')

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants')

module.exports = (phase, info) => {
  // core NextJS production only config.
  const core = {
    target: 'server',
    distDir: 'build/client',
    serverRuntimeConfig: {},
    publicRuntimeConfig: {
      GRAPHQL_HOST: process.env.GRAPHQL_HOST
    }
  }

  const plugins = [core]

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
    const webpack = require('./config/webpack/webpack.next')

    const builder = {
      webpack
    }

    // webpack bundle analyzer.
    // @see: https://github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer
    const analyzer = [
      withBundleAnalyzer,
      {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE
        ),
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

    plugins.unshift(builder, analyzer)
  }

  return withPlugins(plugins)(phase, info)
}
