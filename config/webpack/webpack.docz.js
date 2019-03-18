const fs = require('fs')
const path = require('path')
const parse = require('parse-gitignore')
const DirectoryTreePlugin = require('directory-tree-webpack-plugin')
const common = require('./webpack.common')

const ignores = parse(fs.readFileSync('.gitignore'))
const cwd = process.cwd()

module.exports = config => {
  config.resolve.alias['~docz'] = path.resolve(cwd, './docs/docz')
  // prettier-ignore
  config.resolve.alias['~source-tree'] = path.resolve(cwd, './.docz/source-tree.json')

  config.plugins.push(
    new DirectoryTreePlugin({
      dir: './',
      path: './.docz/source-tree.json',
      exclude: ignores.map(ignore => new RegExp(`(^|/)${ignore}($|/)`))
    })
  )

  return common(config, {})
}
