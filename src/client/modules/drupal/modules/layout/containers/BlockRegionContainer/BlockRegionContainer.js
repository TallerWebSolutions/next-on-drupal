import React, { memo } from 'react'
import { shape, string } from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'next/router'
import { compose } from 'ramda'
import parse from 'url-parse'

import BlockRegion from '~drupal/modules/layout/components/BlockRegion'

import query from './query.gql'

const BlockRegionContainer = ({
  region,
  path,
  router: { asPath },
  ...props
}) => (
  <Query
    query={ query }
    variables={ { region, path: path || parse(asPath, true).pathname } }
  >
    { ({ data, loading, error }) => {
      if (loading) return <div>loading...</div>

      // let errors be handled above.
      if (error) throw error

      // ensure we alert when used on a non-layouted route.
      if (!data || !data.route || !data.route.blocks) {
        throw new Error(
          'BlockRegionContainer can only be used on layouted routes.'
        )
      }

      return !data.route.blocks.length ? null : (
        <BlockRegion { ...props } blocks={ data.route.blocks } />
      )
    } }
  </Query>
)

BlockRegionContainer.propTypes = {
  region: string.isRequired,
  path: string,
  router: shape({
    asPath: string.isRequired
  })
}

export default compose(
  memo,
  withRouter
)(BlockRegionContainer)
