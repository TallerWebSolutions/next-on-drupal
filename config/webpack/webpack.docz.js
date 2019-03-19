const path = require('path')
const CreateFileWebpack = require('create-file-webpack')
const slug = require('limax')
const common = require('./webpack.common')
const { name } = require('../../package')

const cwd = process.cwd()

module.exports = config => {
  config.resolve.alias['~docz'] = path.resolve(cwd, './docs/docz')

  config.plugins.push(
    new CreateFileWebpack({
      path: config.output.path,
      fileName: 'CNAME',
      content: slug(name) + '.surge.sh'
    })
  )

  return common(config, {})
}
