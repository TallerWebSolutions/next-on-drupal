import App from 'next/app'
import { compose } from 'ramda'

import connectGraphQL from '@source/api/provider'
import connectGlobalStyles from '@styleguide/providers/global-styles'

export default compose(
  connectGlobalStyles,
  connectGraphQL
)(App)
