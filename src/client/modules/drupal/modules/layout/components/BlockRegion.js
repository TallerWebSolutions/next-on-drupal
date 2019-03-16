import React, { Fragment, memo } from 'react'
import { arrayOf, object } from 'prop-types'

import BlockResolverContainer from '~drupal/modules/layout/containers/BlockResolverContainer'

const BlockRegion = ({ blocks }) => (
  <Fragment>
    { blocks.map((block, index) => (
      <BlockResolverContainer key={ block.entityId } block={ block } />
    )) }
  </Fragment>
)

BlockRegion.propTypes = {
  blocks: arrayOf(object).isRequired
}

export default memo(BlockRegion)
