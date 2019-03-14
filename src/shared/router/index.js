/*
 * Drupal route matching system.
 * -----------------------------
 */

import { makePromise, execute } from 'apollo-link'
import { link } from '@shared/api/link'

import { getPage } from './routes'
import query from './query.gql'

// prettier-ignore
const ignored = [
  /^\/_next\//,
  /^\/static\//
]

/**
 * Takes a location and resolves it based in a Drupal path.
 */
export const resolve = async location => {
  const path = (typeof location === 'object' ? location.path : location) || ''

  // abort, if path should be ignored.
  if (ignored.some(regex => regex.test(path))) return null

  // build a graphql operation.
  const operation = { query, variables: { path } }

  // prettier-ignore
  // execute route query against Drupal.
  const { data: { route } } = await makePromise(execute(link, operation))

  // abort, if no Drupal route found.
  if (!route) return null

  // try to resolve the route to a NextJS known page.
  const page = getPage(route)

  // abort, if no NextJS page found.
  if (!page) return null

  return { route, page }
}
