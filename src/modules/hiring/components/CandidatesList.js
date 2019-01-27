import { number } from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Table } from '@styleguide'
import CursorPagination from '@@pipefy/components/CursorPagination'

const PIPEFY_HIRING_PIPE = '348765'

const CANDIDATES_QUERY = gql`
  query Candidates($before: String, $after: String, $first: Int, $last: Int) {
    candidates: pipefyAllCards(
      pipeId: "${PIPEFY_HIRING_PIPE}"
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      pagination: pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }

      edges {
        cursor
        candidate: node {
          id
          name: title
          email: field(name: "E-mail") {
            name
            value
          }
        }
      }
    }
  }
`

const columns = [
  {
    title: 'Nome',
    dataIndex: 'candidate.name',
    key: 'name'
  },
  {
    title: 'E-mail',
    dataIndex: 'candidate.email.value',
    key: 'email'
  }
]

const CandidatesList = ({ perPage }) => (
  <Query query={ CANDIDATES_QUERY } variables={ { first: perPage } }>
    { ({ data, loading, error, refetch }) => {
      if (error) {
        console.error(error)
        return <div>Failed to load</div>
      }

      const dataSource =
        (data && data.candidates && data.candidates.edges) || []

      return (
        <Table
          dataSource={ dataSource }
          columns={ columns }
          loading={ loading }
          rowKey='cursor'
          pagination={ false }
          footer={ () =>
            data.candidates ? (
              <div style={ { display: 'flex', justifyContent: 'flex-end' } }>
                <CursorPagination
                  perPage={ perPage }
                  pagination={ data.candidates.pagination }
                  onChange={ refetch }
                />
              </div>
            ) : null
          }
        />
      )
    } }
  </Query>
)

CandidatesList.propTypes = {
  perPage: number
}

CandidatesList.defaultProps = {
  perPage: 10
}

export default CandidatesList
