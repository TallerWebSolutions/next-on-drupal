/**
 * Pipefy cursor based pagination API is broken - it does not return
 * hasNextPage/hasPreviousPage correctly. This component is an upperset
 * on CursorPagination component which basically tracks page visiting to
 * correct Pipefy's fault.
 */

import { State } from 'react-powerplug'
import CursorPagination from '@source/components/CursorPagination'

const PipefyCursorPagination = ({
  onChange,
  pagination: { hasNextPage, hasPreviousPage, startCursor, endCursor },
  ...rest
}) => (
  <State initial={ { current: 0, max: 0 } }>
    { ({ state: { current, max }, setState, resetState }) => (
      <CursorPagination
        onChange={ ({ before, after, first, last }) => {
          // clicked "Início" button.
          if (!before && !after) resetState()
          // clicked "prev" button.
          if (before && !after) setState({ current: current - 1, max })
          // clicked "prev" button.
          if (!before && after) {
            setState({ current: current + 1, max: Math.max(max, current + 1) })
          }

          onChange({ before, after, first, last })
        } }
        pagination={ {
          hasNextPage: hasNextPage || max > current,
          hasPreviousPage: current > 0,
          startCursor: startCursor,
          endCursor: endCursor
        } }
        { ...rest }
      />
    ) }
  </State>
)

PipefyCursorPagination.propTypes = CursorPagination.propTypes
PipefyCursorPagination.defaultProps = CursorPagination.defaultProps

export default PipefyCursorPagination
