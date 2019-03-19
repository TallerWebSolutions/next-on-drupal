const modifyBundlerConfig = require('./config/webpack/webpack.docz')

module.exports = {
  title: 'Next ♥ Drupal',
  menu: [
    'Introduction',
    'Getting Started',
    'Environment & Commands',
    'Structure',
    'Composition',
    'Routing',
    'Layouts & Blocks'
  ],
  wrapper: 'docs/docz/Provider',
  dest: 'build/docs',
  modifyBundlerConfig
}
