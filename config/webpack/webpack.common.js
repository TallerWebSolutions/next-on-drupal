const path = require('path')
const babelResolvers = require('../babel/babel.common')

/**
 * Clone babel aliases to have CSS/GraphQL files be able to use them.
 */
const copyAliases = (config, options) => {
  config.resolve = config.resolve || {}
  config.resolve.alias = config.resolve.alias || {}

  const aliases = babelResolvers().plugins.find(
    ([plugin]) => plugin === 'module-resolver'
  )[1].alias

  for (let src in aliases) {
    config.resolve.alias[src] = path.resolve(aliases[src])
  }
}

/**
 * This webpack config transformer is used on both Next and Server builds.
 *
 * @param {Object} config Current webpack config.
 * @param {Object} options Custom options as provided by Next (and mimicked on the Server build).
 *
 * @return {Object} webpack config.
 */
module.exports = (config, options) => {
  config.module.rules.push({
    test: /\.gql$/,
    use: { loader: 'graphql-tag/loader' }
  })

  copyAliases(config, options)

  return config
}
