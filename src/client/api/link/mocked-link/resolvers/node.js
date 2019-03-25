export default {
  Query: {
    nodeById: () => ({ __typename: 'NodePage', title: 'Node loaded by ID' })
  }
}
