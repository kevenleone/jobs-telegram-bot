const Router = require('express').Router()
const IndexController = require('./controller/index.controller')

Router.get('/', (req, res, next) => IndexController.test(req, res, next))
// Router.get('/', IndexController.getOne)

module.exports = Router
