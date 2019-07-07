const versionModel = require('../../../../models/version.model')

class IndexController {
  async test (req, res, next) {
    const versions = await versionModel.find()
    res.send({ versions })
  }
}

module.exports = new IndexController()
