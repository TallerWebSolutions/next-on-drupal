import React, { memo } from 'react'
import PropTypes from 'prop-types'

import blocks from '../lib/blocks'

export const BlockResolverContainer = ({ block }) => {
  const BlockComponent = blocks.find(({ is }) => is(block))

  return <BlockComponent block={ block } />
}

BlockResolverContainer.propTypes = {
  block: PropTypes.object.isRequired
}

export default memo(BlockResolverContainer)
