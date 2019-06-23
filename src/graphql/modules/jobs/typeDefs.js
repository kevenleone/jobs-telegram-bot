const { gql } = require('apollo-server-express')

module.exports = gql`
    type Query {
        hello: String
        Jobs(title: String): [Jobs]
    }

    type Jobs {
        title: String
        link: String
        city: String
        date: String
        database: String
        company: Company,
        job: Job
    }

    type Job {
        career: String
        job: String
        salary: String
        description: String
        contract: String
        apply: String
        requirements: [String]
        responsabilities: [String]
    }

    type Company {
        name: String
        logo: String
        about: String
        benefits: [String]
    }
`
