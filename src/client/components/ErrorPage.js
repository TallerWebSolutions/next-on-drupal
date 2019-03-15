/**
 * Base page component for error pages.
 */

import { node } from 'prop-types'
import React from 'react'

import PublicPage from './PublicPage'

const ErrorPage = ({ children, ...props }) => (
  <PublicPage { ...props }>Warning sign? { children }</PublicPage>
)

ErrorPage.propTypes = {
  children: node
}

export default ErrorPage
