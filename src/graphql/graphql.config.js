const Jobs = require('./modules/jobs')
const User = require('./modules/user')
const Schema = require('./graphql.schema')

module.exports = {
  resolvers: {
    Query: {
      ...Jobs.resolvers.Query,
      ...User.resolvers.Query
    },
    Mutation: {
      ...User.resolvers.Mutation
    }
  },
  typeDefs: [Schema, Jobs.typeDefs, User.typeDefs],
  context: ({ req }) => {
    const { operationName } = req.body
  }
}
