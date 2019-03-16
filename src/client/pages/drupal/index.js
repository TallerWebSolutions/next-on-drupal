import React, { PureComponent } from 'react'

import { resolve } from '@shared/router'
import DrupalPageResolverContainer from '@drupal/modules/pages/containers/DrupalPageResolverContainer'

class DrupalPage extends PureComponent {
  static async getInitialProps ({ asPath, query }) {
    const route = query.route || (await resolve(asPath))
    return { route }
  }

  render () {
    return <DrupalPageResolverContainer route={ this.props.route } />
  }
}

export default DrupalPage
