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
    'Layouts & Blocks',
    'Menus'
  ],
  wrapper: 'docs/docz/Provider',
  src: './docs',
  dest: './build/docs',
  modifyBundlerConfig
}
