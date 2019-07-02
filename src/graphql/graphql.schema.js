const { gql } = require('apollo-server-express')

module.exports = gql`
    type Query {
        hello: String
        findJobs(title: String, city: String, database: String, searchKey: String, pageSize: Int, pageIndex: Int): findJobs
        Authenticate(email: String!, password: String!): User
    }

    type Mutation {
        CreateUser(email: String!, password: String!, name: String!, lastname: String!): User
    }
`
