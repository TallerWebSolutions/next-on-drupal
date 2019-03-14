import { Component } from 'react'
import { object } from 'prop-types'
import Head from 'next/head'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import config from '@shared/env'

import { link } from './link'
import { initialize } from './client'

export default App =>
  class Apollo extends Component {
    static displayName = 'apollo(App)'

    static propTypes = {
      __APOLLO_STATE__: object
    }

    static defaultProps = {
      __APOLLO_STATE__: null
    }

    /**
     * Fetch GraphQL data on server to match request.
     *
     * Next.js is of big help here; it WILL automatically run this function
     * on first page load (not only when routing on the client-side) and inject the
     * resolved properties, serialized, to the component once it is loaded on the
     * client-side.
     *
     * Keep in mind that for client-side routing this method WILL execute,
     * meaning you have to account for it running on two varying situations.
     *
     * @param {Object} ctx NextJS request context
     * @param {String} ctx.pathname Path section of URL
     * @param {Object} ctx.query Query string section of URL parsed as an object
     * @param {String} ctx.asPath String of the actual path (including the query)
     *  as shown in the browser
     * @param {Object} ctx.req HTTP request object (server only)
     * @param {Object} ctx.res HTTP response object (server only)
     * @param {Object} ctx.jsonPageRes Fetch Response object (client only)
     * @param {Object} ctx.err Error object if any error is encountered during the rendering
     *
     * @return {Object} initial props.
     */
    static async getInitialProps (ctx) {
      const props = App.getInitialProps ? await App.getInitialProps(ctx) : {}

      // When on the client-side, do not defer initialization.
      if (process.browser || config('APOLLO_SSR_OFF')) {
        return props
      }

      // Provide the HTTP response as context for the link during SSR.
      const apolloClient = initialize({ link })

      try {
        // Mount ComposedComponent element tree.
        const tree = (
          <ApolloProvider client={ apolloClient }>
            <App { ...props } Component={ ctx.Component } router={ ctx.router } />
          </ApolloProvider>
        )

        // Dispatch all GraphQL queries in the component tree. We don't save
        // it to any variable because we can extract the cache from the client.
        await getDataFromTree(tree)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('SSR Apollo data loading error:', error)
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
      }

      // getDataFromTree does not call componentWillUnmount. Head is a
      // side effect based system, therefore needs to be cleared manually
      Head.rewind()

      // Inject current Apollo state on the page's initial properties.
      props.__APOLLO_STATE__ = apolloClient.cache.extract()

      return props
    }

    constructor (props) {
      super(props)

      const { __APOLLO_STATE__: initialState } = this.props

      this.apolloClient = initialize({ initialState, link })
    }

    render () {
      // Extract Apollo state, for ComposedComponent doesn't need to know it existed.
      // eslint-disable-next-line no-unused-vars, (extraction)
      const { __APOLLO_STATE__, ...props } = this.props

      return (
        <ApolloProvider client={ this.apolloClient }>
          <App { ...this.props } />
        </ApolloProvider>
      )
    }
  }
