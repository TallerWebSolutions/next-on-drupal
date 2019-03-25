import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import typeDefs from './schema.gql'

const requireMocks = require.context('./mocks/', true, /\.js$/)
const requireResolvers = require.context('./resolvers/', true, /\.js$/)

const resolvers = {}

// load all mocks.
requireResolvers.keys().forEach(module => {
  const resolvedTypes = requireResolvers(module).default

  for (let typeName in resolvedTypes) {
    resolvers[typeName] = resolvers[typeName] || {}

    for (let fieldName in resolvedTypes[typeName]) {
      resolvers[typeName][fieldName] = resolvedTypes[typeName][fieldName]
    }
  }
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false }
})

const mocks = {}

// load all mocks.
requireMocks.keys().forEach(module => {
  const mockedTypes = requireMocks(module).default

  for (let typeName in mockedTypes) {
    mocks[typeName] = mockedTypes[typeName]
  }
})

// add default mocking.
addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true })

const link = new SchemaLink({ schema })

export { link }
