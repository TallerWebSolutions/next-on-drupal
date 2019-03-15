const path = require('path')
const externals = require('webpack-node-externals')
const common = require('./webpack.common')

const cwd = process.cwd()

const config = {
  target: 'node',
  optimization: { nodeEnv: false },
  externals: [externals()],
  entry: path.resolve(cwd, './src/server/index.js'),
  output: { path: path.resolve(cwd, './build'), filename: 'server.js' },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [path.resolve(cwd, './config/babel/.babelrc.server.js')]
          }
        }
      }
    ]
  }
}

const options = {
  dev: process.env !== 'production'
}

module.exports = common(config, options)
