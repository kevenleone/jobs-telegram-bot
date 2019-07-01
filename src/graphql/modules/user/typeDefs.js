const { gql } = require('apollo-server-express')

module.exports = gql`

    type User {
        name: String!
        lastname: String!
        email: String!
        password: String!
        createdAt: String
    }
`
