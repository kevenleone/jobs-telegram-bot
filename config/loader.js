const express = require('express');
const bodyParser = require('body-parser');
const Telegram = require('../src/Core/Telegram');
require('dotenv').config();
const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

Telegram.run();

module.exports = server;