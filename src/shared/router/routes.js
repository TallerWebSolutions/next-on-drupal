/*
 * Drupal route matching system.
 * -----------------------------
 */

import { T, always as use, cond, pathEq, both } from 'ramda'

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
const routes = [
  [both(type('node'), bundle('page')), use('/node/page')],
  [both(type('node'), bundle('article')), use('/node/article')]
]

/**
 * Resolves a given Drupal route to a NextJS page.
 *
 * @param {Object} route A GraphQL Url type object.
 *
 * @return {String} the resolved page path, or null.
 */
export const getPage = cond([...routes, [T, use(null)]])
