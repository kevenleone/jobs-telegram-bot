const JobModel = require('../../../models/job.model')

class JobResolver {
  deleteEmptyArguments (query) {
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

  Resolver () {
    return {
      Query: {
        hello: () => 'Hello world !',
        Jobs: async (obj, args) => {
          this.deleteEmptyArguments(args)
          const jobs = await JobModel.find(args)
            .lean()
            .limit(20)
          return jobs
        }
      }
    }
  }
}

module.exports = new JobResolver()
