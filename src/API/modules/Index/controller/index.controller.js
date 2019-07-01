class IndexController {
  test (req, res, next) {
    res.send('o i')
  }
}

module.exports = new IndexController()
