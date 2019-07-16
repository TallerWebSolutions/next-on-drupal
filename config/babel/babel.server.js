const { resolve } = require('path')

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10'
        }
      }
    ],
    resolve(__dirname, './babel.common.js')
  ]
})
