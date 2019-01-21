import App from 'next/app'
import { compose } from 'ramda'

import connectGraphQL from '@source/api/provider'
import connectGlobalStyles from '@styleguide/provider'

export default compose(
  connectGlobalStyles,
  connectGraphQL
)(App)
