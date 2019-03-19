const path = require('path')
const common = require('./webpack.common')

const cwd = process.cwd()

module.exports = config => {
  config.resolve.alias['~docz'] = path.resolve(cwd, './docs/docz')

  return common(config, {})
}
