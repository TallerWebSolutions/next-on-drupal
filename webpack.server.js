const path = require('path')
const externals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  optimization: { nodeEnv: false },
  externals: [externals()],
  entry: path.resolve(__dirname, 'server/index.js'),
  output: { path: path.resolve(__dirname, 'build'), filename: 'server.js' },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['./config/babel/.babelrc.server.js']
          }
        }
      }
    ]
  }
}
