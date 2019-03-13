/**
 * Component used for most public accessible pages.
 */

import React from 'react'
import { node, string } from 'prop-types'

import Page from './Page'

const PublicPage = ({ title, children }) => (
  <Page title={ title }>
    <div>header goes here</div>
    { children }
    <div>footer goes here</div>
  </Page>
)

PublicPage.propTypes = {
  children: node.isRequired,
  title: string
}

PublicPage.defaultProps = {
  title: null
}

export default PublicPage
