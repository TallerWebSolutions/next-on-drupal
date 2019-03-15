import { shape, string } from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'

import PublicPage from '@client/components/PublicPage'
import LoadingPublicPage from '@client/components/LoadingPublicPage'
import ErrorPage404 from '@client/components/ErrorPage404'
import ErrorPage500 from '@client/components/ErrorPage500'

const query = gql`
  query NODE_ARTICLE_PAGE($entityId: String!) {
    node: nodeById(id: $entityId) {
      title
      body {
        value
      }
    }
  }
`

const NodeArticlePage = ({
  router: {
    query: { entity },
    ...rest
  }
}) => (
  <Query query={ query } variables={ entity }>
    { ({ data: { node }, loading, error }) => {
      if (loading) return <LoadingPublicPage />
      if (error) return <ErrorPage500 />
      if (!node) return <ErrorPage404 />

      return (
        <PublicPage title={ `%base | ${node.title}` }>
          <h1>{ node.title }</h1>
          <main>
            <div dangerouslySetInnerHTML={ { __html: node.body.value } } />
          </main>
        </PublicPage>
      )
    } }
  </Query>
)

NodeArticlePage.propTypes = {
  router: shape({
    query: shape({
      entity: shape({
        entityId: string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default withRouter(NodeArticlePage)
