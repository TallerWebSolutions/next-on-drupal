/**
 * Component used for mostly all pages.
 *
 * Useful to unifying general meta-data/layout setup.
 */

import React, { Fragment } from 'react'
import { string, node } from 'prop-types'
import Head from 'next/head'

const baseTitle = 'Next on Drupal'

const Page = ({ title, children }) => (
  <Fragment>
    { title && (
      <Head>
        <title>{ title.replace('%base', baseTitle) }</title>
      </Head>
    ) }

    { children }
  </Fragment>
)

Page.propTypes = {
  children: node.isRequired,
  title: string
}

export default Page
