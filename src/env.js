import getConfig from 'next/config'
import createDebugger from '~source/debugger'

const debug = createDebugger('env')

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() || {}

const envs = {
  ...serverRuntimeConfig,
  ...publicRuntimeConfig,
  ...process.env
}

/**
 * Singleton factory for loading Next.js defined configs.
 *
 * @see: https://github.com/zeit/next.js/#exposing-configuration-to-the-server--client-side
 */
const env = (name, fallback) => {
  if (typeof envs[name] !== 'undefined') return envs[name]

  // Ensure developer knows of the missing config.
  debug(`fallback: %s => %s`, name, fallback)

  return fallback
}

export default env
