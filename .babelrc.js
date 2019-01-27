const { existsSync, statSync } = require('fs')
const { basename, dirname, extname, join, resolve } = require('path')
const { resolvePath } = require('babel-plugin-module-resolver')

/**
 * Babel-module-resolve customization to map "/Component" to "/Component/Component.js"
 * paths when necessary.
 */
const resolveComponentPath = (sourcePath, currentFile, opts) => {
  const defaultPath = resolvePath(sourcePath, currentFile, opts)

  try {
    const resolved = resolve(dirname(currentFile), defaultPath)

    if (statSync(resolved).isDirectory()) {
      const ext = extname(sourcePath) || '.js'
      const index = join(resolved, 'index' + ext)
      const component = join(resolved, basename(resolved) + ext)

      if (!existsSync(index) && existsSync(component)) {
        return component
      }
    }
  } catch (err) {
    // ignore errors, simply return default resolved path.
  }

  return defaultPath
}

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@source': './src',
          '@styleguide': './src/styleguide',
          '^@@(.+)': './src/modules/\\1'
        },
        resolvePath: resolveComponentPath
      }
    ],
    ['styled-components', { ssr: true, displayName: true, preprocess: false }]
  ]
}
