import { ApolloLink } from 'apollo-link'

import { link as httpLink } from './http'

// prettier-ignore
const links = [
  httpLink
]

const link = ApolloLink.from(links)

export { link }
