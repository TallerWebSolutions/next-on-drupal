import React from 'react'
import { object } from 'prop-types'
import debug from '@source/debug'

const BlockNotFound = ({ block }) => {
  debug('layout')('unkown block %O', block)

  return <div>Unknown block</div>
}

BlockNotFound.propTypes = {
  block: object.isRequired
}

BlockNotFound.is = () => true

export default BlockNotFound
