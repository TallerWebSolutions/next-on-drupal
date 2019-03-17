const path = require('path')
const common = require('./config/webpack/webpack.common')

const modifyBundlerConfig = config => {
  config.resolve.alias['~docz'] = path.resolve(__dirname, './docs/docz')
  return common(config, {})
}

export default {
  wrapper: 'docs/docz/Provider',
  modifyBundlerConfig
}
