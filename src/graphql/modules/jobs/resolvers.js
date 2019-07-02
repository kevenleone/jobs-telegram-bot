const JobModel = require('../../../models/job.model')
const Controller = require('../../resolver.controller')
class JobResolver extends Controller {
  deleteEmptyArguments (query) {
    delete query.pageIndex
    delete query.pageSize

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
        findJobs: async (obj, args) => {
          const pager = this.PaginationUtils.normalize(args)
          const promises = []
          this.deleteEmptyArguments(args)

          promises.push(JobModel.countDocuments()
            .where(args)
            .exec())

          promises.push(JobModel.find()
            .where(args)
            .limit(pager.limit)
            .skip(pager.skip)
            .sort({ date: -1 })
            .lean()
          )

          const [maxResults, Jobs] = await Promise.all(promises)

          return {
            pageIndex: pager.pageIndex,
            pageSize: pager.pageSize,
            limit: pager.limit,
            maxResults,
            Jobs
          }
        }
      }
    }
  }
}

module.exports = new JobResolver()
