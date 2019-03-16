/**
 * Drupal pages resolution library.
 */

import dynamic from 'next/dynamic'
import ErrorPage404 from '~client/components/ErrorPage404'
import { routes } from './routes'

const NodeArticle = dynamic(() => import('~client/pages/drupal/node/article'))
const NodePage = dynamic(() => import('~client/pages/drupal/node/page'))

// prettier-ignore
// the pages registry, in order of precendence.
const pages = [
  { component: NodePage, is: routes['node-page'] },
  { component: NodeArticle, is: routes['node-article'] },
  { component: ErrorPage404, is: () => true }
]

export default pages
