/**
 * Component used for mostly all pages.
 *
 * Useful to unifying general meta-data/layout setup.
 */

import { Fragment } from 'react'
import { string, node } from 'prop-types'
import Head from 'next/head'

const baseTitle = 'Drupal Next'

const Page = ({ title, children }) => (
  <Fragment>
    <Head>
      <title>{ title.replace('%base', baseTitle) }</title>
    </Head>

    { children }
  </Fragment>
)

Page.propTypes = {
  children: node.isRequired,
  title: string
}

Page.defaultProps = {
  title: '%base'
}

export default Page
