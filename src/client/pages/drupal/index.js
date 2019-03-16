import React, { PureComponent } from 'react'
import { object } from 'prop-types'

import { resolve } from '@drupal/modules/pages/lib/resolver'
import DrupalPageResolverContainer from '@drupal/modules/pages/containers/DrupalPageResolverContainer'

class DrupalPage extends PureComponent {
  static propTypes = {
    route: object.isRequired
  }

  static async getInitialProps ({ asPath, query }) {
    const route = query.route || (await resolve(asPath))
    return { route }
  }

  render () {
    return <DrupalPageResolverContainer route={ this.props.route } />
  }
}

export default DrupalPage
