/**
 * Drupal pages resolution library.
 */

import ErrorPage404 from '@client/components/ErrorPage404'

import NodePage from '@client/pages/drupal/node/page'
import NodeArticle from '@client/pages/drupal/node/article'

import { routes } from './routes'

// prettier-ignore
// the pages registry, in order of precendence.
const pages = [
  { component: NodePage, is: routes['node-page'] },
  { component: NodeArticle, is: routes['node-article'] },
  { component: ErrorPage404, is: () => true }
]

export default pages
