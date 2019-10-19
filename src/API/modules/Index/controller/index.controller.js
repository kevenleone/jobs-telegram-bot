class IndexController {
  async test (req, res, next) {
    res.send({ test: 'ok' });
  }
}

module.exports = new IndexController();
