const { resolve } = require('path')

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8'
        }
      }
    ],
    resolve(__dirname, './.babel.resolvers.js')
  ]
})
