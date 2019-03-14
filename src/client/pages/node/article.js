import { shape, string } from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import PublicPage from '@client/components/PublicPage'
import LoadingPublicPage from '@client/components/LoadingPublicPage'

const query = gql`
  query NODE_ARTICLE_PAGE($entityId: String!) {
    node: nodeById(id: $entityId) {
      title
    }
  }
`

const NodeArticlePage = ({
  url: {
    query: { entity }
  }
}) => (
  <Query query={ query } variables={ entity }>
    { ({ data: { node }, loading }) => {
      if (loading) return <LoadingPublicPage />

      return (
        <PublicPage title={ `%base | ${node.title}` }>
          article: { node.title }
        </PublicPage>
      )
    } }
  </Query>
)

NodeArticlePage.propTypes = {
  url: shape({
    query: shape({
      entity: shape({
        entityId: string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default NodeArticlePage
