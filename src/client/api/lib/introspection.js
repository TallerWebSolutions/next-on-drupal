/**
 * This file holds logic regarding the necessary introspection
 * query made to the GraphQL endpoint to build the fragment
 * matching system.
 */

import { makePromise, execute } from 'apollo-link'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { pipe, prop } from 'ramda'

import query from './fragment-matcher-query.gql'

/**
 * Normalize introspection result to keep only needed data.
 */
const normalize = pipe(
  prop('data'),
  data => {
    // here we're filtering out any type information unrelated to unions or interfaces
    // @see: https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
    data.__schema.types = data.__schema.types.filter(
      type => type.possibleTypes !== null
    )

    return data
  }
)

/**
 * Handle connection error to point developer to a solution.
 */
const handleConnectionError = err => {
  if (err.name === 'FetchError' && err.code === 'ECONNREFUSED') {
    throw new Error(
      'Could not connect to GraphQL API. During development, make sure you are running it locally.'
    )
  }

  throw err
}

// cache in-memory
let introspectionData

/**
 * Imperative introspection fulfil.
 */
export const saveIntrospectionData = data => {
  introspectionData = data
  return data
}

/**
 * Performs an fragment-matcher introspection query on the provided link.
 */
export const introspectLink = link =>
  introspectionData ||
  makePromise(execute(link, { query }))
    .then(normalize)
    .then(saveIntrospectionData)
    .catch(handleConnectionError)

/**
 * Creates an instropection fragment matcher based on a provided
 * introspection query result.
 */
export const createFragmentMatcher = introspection =>
  new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspection
  })
