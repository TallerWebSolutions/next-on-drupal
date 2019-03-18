const modifyBundlerConfig = require('./config/webpack/webpack.docz')

module.exports = {
  wrapper: 'docs/docz/Provider',
  modifyBundlerConfig
}
