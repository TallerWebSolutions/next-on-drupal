import { complement } from 'ramda'

/**
 * Check if code is running on production mode.
 */
export const isProduction = () =>
  typeof process !== 'undefined' && process.env.NODE_ENV === 'production'

/**
 * Check if code is running on development mode.
 */
export const isDevelopment = complement(isProduction)

/**
 * Check if code is running on the client.
 *
 * If process is available (Next), check if it has a property "browser".
 * Otherwise, check if a window object is available.
 */
export const isClient = () =>
  typeof process !== 'undefined'
    ? !!process.browser
    : typeof window !== 'undefined'
