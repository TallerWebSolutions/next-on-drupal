const path = require('path')
const CreateFileWebpack = require('create-file-webpack')
const common = require('./webpack.common')

const cwd = process.cwd()

module.exports = config => {
  config.resolve.alias['~docz'] = path.resolve(cwd, './docs/docz')

  config.plugins.push(
    new CreateFileWebpack({
      path: config.output.path,
      fileName: 'CNAME',
      content: 'next-on-drupal.surge.sh'
    })
  )

  return common(config, {})
}
