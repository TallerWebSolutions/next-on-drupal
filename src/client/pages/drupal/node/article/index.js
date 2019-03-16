import { shape, string } from 'prop-types'
import { Query } from 'react-apollo'

import PublicPage from '@client/components/PublicPage'
import LoadingPublicPage from '@client/components/LoadingPublicPage'
import ErrorPage404 from '@client/components/ErrorPage404'
import ErrorPage500 from '@client/components/ErrorPage500'

import BlockRegionContainer from '@drupal/modules/layout/containers/BlockRegionContainer'

import query from './query.gql'

const NodeArticlePage = ({ route: { entity } }) => (
  <Query query={ query } variables={ entity }>
    { ({ data: { node }, loading, error }) => {
      if (loading) return <LoadingPublicPage />
      if (error) return <ErrorPage500 />
      if (!node) return <ErrorPage404 />

      return (
        <PublicPage title={ `%base | ${node.title}` }>
          <h1>{ node.title }</h1>
          <BlockRegionContainer region='header' />
          <main>
            <div dangerouslySetInnerHTML={ { __html: node.body.value } } />
          </main>
        </PublicPage>
      )
    } }
  </Query>
)

NodeArticlePage.propTypes = {
  route: shape({
    entity: shape({
      entityId: string.isRequired
    }).isRequired
  }).isRequired
}

export default NodeArticlePage
