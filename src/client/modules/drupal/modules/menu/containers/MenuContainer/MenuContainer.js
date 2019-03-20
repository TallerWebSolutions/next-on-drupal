import React, { memo } from 'react'
import { string, number, func } from 'prop-types'
import { Query } from 'react-apollo'

import query from './query.gql'

const MenuContainer = ({ children, name, depth }) => {
  const variables = { name }

  for (let i = 1; i <= 10; i++) {
    variables['depth' + i] = i <= depth
  }

  return (
    <Query query={ query } variables={ variables }>
      { ({ data, ...rest }) => children({ menu: data && data.menu, ...rest }) }
    </Query>
  )
}

MenuContainer.propTypes = {
  children: func.isRequired,
  name: string.isRequired,
  depth: number.isRequired
}

MenuContainer.defaultProps = {
  depth: 1
}

export default memo(MenuContainer)
