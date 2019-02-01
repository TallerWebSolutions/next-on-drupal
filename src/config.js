import getConfig from 'next/config'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()
const allConfigs = { ...publicRuntimeConfig, ...serverRuntimeConfig }

/**
 * Singleton factory for loading Next.js defined configs.
 *
 * @see: https://github.com/zeit/next.js/#exposing-configuration-to-the-server--client-side
 */
export default (name, fallback) => {
  if (typeof allConfigs[name] !== 'undefined') return allConfigs[name]

  // Ensure developer knows of the missing config.
  console.warn(`Fallback ${name} to "${fallback}".`)

  return fallback
}
