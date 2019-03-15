const { resolve } = require('path')

module.exports = () => ({
  presets: ['next/babel', resolve(__dirname, './babel.common.js')],
  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }]
  ]
})
