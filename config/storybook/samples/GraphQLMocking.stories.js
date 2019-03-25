import React from 'react'
import { storiesOf } from '@storybook/react'
import { Query } from 'react-apollo'
import { MockedProvider } from 'react-apollo/test-utils'
import gql from 'graphql-tag'

const query = gql`
  query SomeQuery {
    rootField {
      subField
    }
  }
`

const Component = () => (
  <Query query={ query }>
    { ({ data, loading, error }) => (
      <dl>
        <dt>loading</dt>
        <dd>
          <pre>{ JSON.stringify(loading, true, 2) }</pre>
        </dd>
        <dt>error</dt>
        <dd>
          <pre>{ JSON.stringify(error, true, 2) }</pre>
        </dd>
        <dt>data</dt>
        <dd>
          <pre>{ JSON.stringify(data, true, 2) }</pre>
        </dd>
      </dl>
    ) }
  </Query>
)

storiesOf('GraphQL Mocking', module)
  .add('success', () => (
    <MockedProvider
      addTypename={ false }
      mocks={ [
        {
          request: { query },
          result: { data: { rootField: { subField: 'sub-field data' } } }
        }
      ] }
    >
      <Component />
    </MockedProvider>
  ))
  .add('error', () => (
    <MockedProvider
      mocks={ [
        {
          request: { query },
          error: new Error('Something went wrong!')
        }
      ] }
    >
      <Component />
    </MockedProvider>
  ))
