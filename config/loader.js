require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const bodyParser = require('body-parser')

const Telegram = require('../src/Core/Telegram')
const Worker = require('../src/worker/job/job.worker')
const GraphqlConfig = require('../src/graphql/graphql.config')

const app = express()

app.use((req, res, next) => {
  next()
})

const server = new ApolloServer({ typeDefs: GraphqlConfig.typeDefs, resolvers: GraphqlConfig.resolvers, tracing: true })

server.applyMiddleware({ app })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Worker.run()

// Telegram.run()

module.exports = app
