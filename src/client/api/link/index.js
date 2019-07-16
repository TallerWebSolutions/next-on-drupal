import { ApolloLink } from 'apollo-link'

import { createLink as createHttpLink } from './http'
// prettier-ignore
const createLink = (context = {}) => ApolloLink.from([
  createHttpLink(context)
])

export { createLink }
