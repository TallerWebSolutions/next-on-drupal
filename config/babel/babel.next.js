const { resolve } = require('path')

module.exports = () => ({
  presets: [
    ['next/babel', { 'transform-runtime': { useESModules: false } }],
    resolve(__dirname, './babel.common.js')
  ],
  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }]
  ]
})
