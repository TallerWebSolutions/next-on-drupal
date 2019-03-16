import React, { memo } from 'react'
import { object } from 'prop-types'

import pages from '../lib/pages'

export const DrupalPageResolverContainer = ({ route }) => {
  const { component: PageComponent } = pages.find(({ is }) => is(route))

  return <PageComponent route={ route } />
}

DrupalPageResolverContainer.propTypes = {
  route: object.isRequired
}

export default memo(DrupalPageResolverContainer)
