const path = require('path')
const externals = require('webpack-node-externals')

const cwd = process.cwd()

module.exports = {
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
      },
      {
        test: /\.gql$/,
        use: { loader: 'graphql-tag/loader' }
      }
    ]
  }
}
