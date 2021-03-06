/**
 * Base page component for publicly accessible pages when loading.
 */

import React from 'react'

import PublicPage from './PublicPage'

const LoadingPublicPage = props => (
  <PublicPage { ...props }>loading...</PublicPage>
)

export default LoadingPublicPage
