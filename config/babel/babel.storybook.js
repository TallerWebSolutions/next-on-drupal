const { resolve } = require('path')

module.exports = () => ({
  presets: [['@babel/preset-react'], resolve(__dirname, './babel.common.js')]
})
