const { gql } = require('apollo-server-express')

module.exports = gql`
    type Query {
        hello: String
        Jobs(title: String, city: String, database: String, searchKey: String): [Jobs]
        Authenticate(email: String!, password: String!): User
    }

    type Mutation {
        CreateUser(email: String!, password: String!, name: String!, lastname: String!): User
    }
`
