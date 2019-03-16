/**
 * Sample block defitions.
 */

import React from 'react'
import { object } from 'prop-types'

import { typenameIs } from '~drupal/modules/layout/lib/util'

const BlockContentBasic = ({ block: { entityLabel, body } }) =>
  // render nothing if block empty.
  !entityLabel && !body ? null : (
    <div>
      { entityLabel ? <h4>{ entityLabel }</h4> : null }
      { body ? (
        <div dangerouslySetInnerHTML={ { __html: body.processed } } />
      ) : null }
    </div>
  )

BlockContentBasic.propTypes = {
  block: object.isRequired
}

/**
 * Predicate for if a block should be rendered by this component or not.
 *
 * @param {Object} block A block as loaded from Drupal.
 *
 * @return {Boolean}
 */
BlockContentBasic.is = typenameIs('BlockContentBasic')

export default BlockContentBasic
