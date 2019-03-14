/**
 * Factory to create application specific debug loggers.
 * @see: https://github.com/visionmedia/debug
 */

import createDebugger from 'debug'

export default name => createDebugger(`next-on-drupal:${name}`)
