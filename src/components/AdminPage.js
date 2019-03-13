/**
 * Component used for most public accessible pages.
 */

import React from 'react'
import { node, string } from 'prop-types'

import Page from './Page'

const AdminPage = ({ title, children }) => (
  <Page title={ title }>
    <div>header with logout goes here</div>
    { children }
  </Page>
)

AdminPage.propTypes = {
  children: node.isRequired,
  title: string
}

AdminPage.defaultProps = {
  title: null
}

export default AdminPage
