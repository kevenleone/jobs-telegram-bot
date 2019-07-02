const messageconstants = require('../Util/message.constants')
const paginate = require('../Util/paginate')
class ResolverController {
  constructor () {
    this.messages = messageconstants
    this.PaginationUtils = paginate
  }
}

module.exports = ResolverController
