/*
 * Drupal route matching system.
 * -----------------------------
 */

import { anyPass, pathEq, both } from 'ramda'

// Match helpers.
const type = pathEq(['entity', 'entityType'])
const bundle = pathEq(['entity', 'entityBundle'])

/**
 * Routes.
 *
 * Each route must be declared as an array where the first item is the
 * matching predicate for the route, and the second is a mapper to the
 * internal path to the page to serve inside pages directory.
 *
 * Both the predicate and the mapper will receive the following arguments:
 *
 * @param {Object} entity The Drupal matched entityContext.
 * @param {Object} location The requested location.
 *
 * @see: https://ramdajs.com/docs/#cond
 */
export const routes = {
  'node-article': both(type('node'), bundle('article')),
  'node-page': both(type('node'), bundle('page'))
}

/**
 * Predicate if route is know to the local routing system.
 *
 * @param {Object} route A GraphQL Url type object.
 *
 * @return {Boolean}
 */
export const isKnownDrupalRoute = anyPass(Object.values(routes))
