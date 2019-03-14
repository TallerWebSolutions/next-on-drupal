import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from '@source/env'

const ssrMode = !process.browser
const connectToDevTools = process.browser && config('NODE_ENV') !== 'production'

/**
 * Creates a new ApolloClient instance.
 *
 * @param {ApolloLink} link ApolloLink instance.
 * @param {Object} initialState Hydrating state.
 * @param {Object} cacheOptions Custom cache options.
 * @return {ApolloClient}.
 */
const createClient = ({ link, initialState } = {}) => {
  const cache = new InMemoryCache().restore(initialState || {})

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
