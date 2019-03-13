import fetch from 'isomorphic-fetch'
import { createHttpLink } from 'apollo-link-http'
import config from '@source/config'

const local = `http://localhost/graphql`
const fallback = config('NODE_ENV') !== 'production' ? local : null
const GRAPHQL_HOST = config('GRAPHQL_HOST', fallback)

if (!GRAPHQL_HOST) {
  throw new Error(
    'You must set GRAPHQL_HOST environment variable prior to using Apollo.'
  )
}

const link = createHttpLink({
  uri: GRAPHQL_HOST,
  fetch,
  includeExtensions: true
})

export { link }
