import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from '@shared/env'

import { createFragmentMatcher } from './lib/introspection'

const ssrMode = !process.browser
const connectToDevTools = process.browser && config('NODE_ENV') !== 'production'

/**
 * Apollo cache id resolver.
 */
export const dataIdFromObject = ({ __typename, ...object }) => {
  // Drupal possible identificators.
  for (let key of ['id', 'entityId', 'fid', 'uid', 'nid', 'tid']) {
    if (object[key]) return `${__typename}:${object[key]}`
  }
}

/**
 * Creates a new ApolloClient instance.
 *
 * @param {ApolloLink} link ApolloLink instance.
 * @param {Object} introspection Fragment matcher introspection.
 * @param {Object} initialState Hydrating state.
 * @param {Object} cacheOptions Custom cache options.
 * @return {ApolloClient}.
 */
const createClient = ({ link, introspection, initialState } = {}) => {
  const fragmentMatcher = createFragmentMatcher(introspection)
  const cacheOptions = { dataIdFromObject, fragmentMatcher }
  const cache = new InMemoryCache(cacheOptions).restore(initialState || {})

  return new ApolloClient({
    connectToDevTools,
    ssrMode,
    link,
    cache
  })
}

// Client singleton (for client-side only; always renewed on server-side).
let apolloClient = null

/**
 * Initialize ApolloClient for either server ou client side.
 *
 * @param {Object} options Apollo Client configuration.
 *
 * @return {ApolloClient}
 */
const initialize = options =>
  // On the browser, always reuse any available ApolloClient instance.
  // On the server, always create a new ApolloClient instance to avoid data leaking.
  process.browser
    ? apolloClient || (apolloClient = createClient(options))
    : createClient(options)

export { initialize }
