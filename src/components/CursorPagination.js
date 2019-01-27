import { Fragment } from 'react'
import { shape, string, bool, func, number } from 'prop-types'

import { Button, Icon, Divider } from '@styleguide'

const CursorPagination = ({
  perPage,
  onChange,
  pagination: { hasNextPage, hasPreviousPage, startCursor, endCursor }
}) => (
  <Fragment>
    <Button.Group>
      <Button
        disabled={ !hasPreviousPage }
        onClick={ () =>
          onChange({
            before: null,
            after: null,
            first: perPage,
            last: null
          })
        }
      >
        Início
      </Button>

      <Divider type='vertical' />

      <Button
        disabled={ !hasPreviousPage }
        onClick={ () =>
          onChange({
            before: startCursor,
            after: null,
            first: null,
            last: perPage
          })
        }
      >
        <Icon type='left' />
      </Button>
      <Button
        disabled={ !hasNextPage }
        onClick={ () =>
          onChange({
            before: null,
            after: endCursor,
            first: perPage,
            last: null
          })
        }
      >
        <Icon type='right' />
      </Button>
    </Button.Group>
  </Fragment>
)

CursorPagination.propTypes = {
  perPage: number,
  onChange: func.isRequired,
  pagination: shape({
    hasNextPage: bool,
    hasPreviousPage: bool,
    startCursor: string,
    endCursor: string
  }).isRequired
}

CursorPagination.defaultProps = {
  perPage: 10
}

export default CursorPagination
