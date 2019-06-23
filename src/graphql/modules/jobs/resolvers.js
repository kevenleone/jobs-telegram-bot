const JobModel = require('../../../models/job.model')

function deleteEmptyArguments (query) {
  Object.keys(query).forEach(key => {
    if (!query[key]) {
      delete query[key]
    } else {
      const value = query[key]
      const valueInRegex = new RegExp(value, 'i')
      query[key] = valueInRegex
    }
  })
}

const Resolvers = {
  Query: {
    hello: () => 'Hello world Papa!',
    Jobs: async (obj, args) => {
      const { title } = args
      const query = {
        title
      }
      deleteEmptyArguments(query)
      const jobs = await JobModel.find(query)
        .lean()
        .limit(20)
      return jobs
    }
  }
}

module.exports = Resolvers
