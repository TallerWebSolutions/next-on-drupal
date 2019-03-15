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

  return config
}
