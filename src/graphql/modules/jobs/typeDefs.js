const { gql } = require('apollo-server-express')

module.exports = gql`
    type findJobs {
        pageIndex: Int
        pageSize: Int
        maxResults: Int
        limit: Int
        Jobs: [Jobs]
    }

    type Job {
        job: String
        apply: String
        career: String
        salary: Salary
        journey: String
        remote: Boolean
        skills: [String]
        contract: String
        description: String
        formation: [String]
        locations: [String]
        frameworks: [String]
        experience: [String]
        requirements: [String]
        responsabilities: [String]
    }

    type Jobs {
        title: String
        link: String
        date: String
        company: Company
        job: Job
        until: String
        searchKey: String
        database: String
    }

    type Company {
        name: String
        logo: String
        about: String
        benefits: [String]
        phone: String
        company_type: String
        website: String
        business_area: String
        location: Location
    }

    type Geolocation {
        lng: String
        lat: String
    }

    type Location {
        number: Int
        country: String
        address: String
        city: String
        neighborhood: String
        state: String
        zip_code: String
        geolocation: Geolocation
    }

    type Salary {
        original: String
        salary_start: String
        salary_final: String
    }
`
