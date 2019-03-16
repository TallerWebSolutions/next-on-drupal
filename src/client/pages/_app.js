import App from 'next/app'
import { compose } from 'ramda'

import connectGraphQL from '~client/api/provider'
import connectGlobalStyles from '~styleguide/provider'

const hoistInitialProps = (...hocs) => Component => {
  const composed = compose(...hocs)(Component)
  composed.getInitialProps = Component.getInitialProps
  return composed
}

export default compose(
  connectGraphQL,
  hoistInitialProps(connectGlobalStyles)
)(App)
