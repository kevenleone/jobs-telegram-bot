const express = require('express')
const bodyParser = require('body-parser')
const Telegram = require('../src/Core/Telegram')
const typeDefs = require('../src/graphql/modules/jobs/typeDefs')
const resolvers = require('../src/graphql/modules/jobs/resolvers')

const app = express()
const { ApolloServer } = require('apollo-server-express')
require('dotenv').config()

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Telegram.run();

module.exports = app
