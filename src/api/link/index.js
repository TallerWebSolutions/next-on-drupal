import { ApolloLink } from 'apollo-link'

import { link as httpLink } from './http'

const link = ApolloLink.from([httpLink])

export { link }
