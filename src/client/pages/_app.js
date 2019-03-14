import App from 'next/app'
import { compose } from 'ramda'

import connectGraphQL from '@client/api/provider'
import connectGlobalStyles from '@styleguide/provider'

export default compose(
  connectGraphQL,
  connectGlobalStyles
)(App)
