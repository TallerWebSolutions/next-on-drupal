const { resolve } = require('path')

module.exports = () => ({
  presets: ['next/babel', resolve(__dirname, './.babel.resolvers.js')],
  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }]
  ]
})
