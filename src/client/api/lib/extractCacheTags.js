import { split, pipe, concat, uniq, join } from 'ramda'
import { isDevelopment, isClient } from '~source/lib/util'

// During development, use Drupal's own cache-tags header.
const headerName = isDevelopment() ? 'X-Drupal-Cache-Tags' : 'Cache-Tag'
const separator = isDevelopment() ? ' ' : ','
const splitTags = split(separator)
const mergeTags = pipe(
  concat,
  uniq,
  join(separator)
)

/**
 * Cache Tags middleware.
 * @param {Object} context
 */
export const extractCacheTags = context => fetcher => (...args) =>
  fetcher(...args).then(response => {
    // Short exit on client or when no response is available (SSR).
    if (isClient() || !context.res) return response

    // Short exit if no cache-tags are found on the response.
    if (!response.headers.has(headerName)) return response

    // Get header current raw value
    const currentValue = context.res.get(headerName)

    // Get an array of current cache-tags.
    const tagsBuffer = currentValue ? splitTags(currentValue) : []

    // Get new cache tags.
    const newTags = splitTags(response.headers.get(headerName))

    // Construct new value for the header combining new tags to old ones.
    const newHeader = mergeTags(tagsBuffer, newTags)

    // Save the new hader value to the server response.
    context.res.set(headerName, newHeader)

    return response
  })
