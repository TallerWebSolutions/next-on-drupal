const path = require('path')
const CreateFileWebpack = require('create-file-webpack')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')
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

  config.plugins.find(
    plugin => plugin instanceof MiniHtmlWebpackPlugin
  ).options.filename = '200.html'

  return common(config, {})
}
