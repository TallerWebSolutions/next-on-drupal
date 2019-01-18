import fetch from 'isomorphic-fetch'
import { createHttpLink } from 'apollo-link-http'

let uri = process.env.GRAPHQL_HOST

if (!uri && process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000

  uri = `http://localhost:${port}/graphql`

  console.warn(
    `Fallback GRAPHQL_HOST to "${uri}". Please, set it in production`
  )
}

if (!uri) {
  throw new Error(
    'You must set GRAPHQL_HOST environment variable prior to using Apollo.'
  )
}

const link = createHttpLink({ uri, fetch, includeExtensions: true })

export { link }
