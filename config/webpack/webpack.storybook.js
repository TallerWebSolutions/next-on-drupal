const CreateFileWebpack = require('create-file-webpack')
const slug = require('limax')
const common = require('./webpack.common')
const { name } = require('../../package')

module.exports = ({ config, mode }) => {
  config.plugins = config.plugins || []

  config.plugins.push(
    new CreateFileWebpack({
      path: config.output.path,
      fileName: 'CNAME',
      content: slug(name) + '--styleguide.surge.sh'
    })
  )

  return common(config, { mode })
}
