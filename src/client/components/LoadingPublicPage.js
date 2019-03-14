/**
 * Component used for most public accessible pages.
 */

import React from 'react'

import PublicPage from './PublicPage'

const LoadingPublicPage = props => (
  <PublicPage { ...props }>loading...</PublicPage>
)

export default LoadingPublicPage
