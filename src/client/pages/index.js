import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'

const SAMPLE_QUERY = gql`
  query {
    route(path: "/") {
      path
      routed
    }
  }
`

const DefinitionList = styled.dl`
  margin: 5em;
`

export default () => (
  <Query query={ SAMPLE_QUERY }>
    { ({ data, error, loading }) => (
      <DefinitionList>
        <dt>loading</dt>
        <dd>
          <pre>{ JSON.stringify(loading, null, 2) }</pre>
        </dd>

        <dt>data</dt>
        <dd>
          <pre>{ JSON.stringify(data, null, 2) }</pre>
        </dd>

        <dt>error</dt>
        <dd>
          <pre>{ JSON.stringify(error, null, 2) }</pre>
        </dd>
      </DefinitionList>
    ) }
  </Query>
)
