import fetchDefault from 'isomorphic-fetch'
import { createHttpLink } from 'apollo-link-http'
import config from '~source/env'
import { extractCacheTags } from '../lib/extractCacheTags'

const local = `http://localhost/graphql`
const fallback = config('NODE_ENV') !== 'production' ? local : null
const GRAPHQL_HOST = config('GRAPHQL_HOST', fallback)

if (!GRAPHQL_HOST) {
  throw new Error(
    'You must set GRAPHQL_HOST environment variable prior to using Apollo.'
  )
}

const createLink = context => {
  const withCacheTags = extractCacheTags(context)

  return createHttpLink({
    uri: GRAPHQL_HOST,
    fetch: withCacheTags(fetchDefault),
    includeExtensions: true,
    useGETForQueries: true
  })
}

export { createLink }
