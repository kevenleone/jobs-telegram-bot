const Router = require('express').Router()
const IndexController = require('./controller/index.controller')

Router.post('/', (req, res, next) => IndexController.test(req, res, next))

module.exports = Router
