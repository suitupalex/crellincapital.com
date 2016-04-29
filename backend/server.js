'use strict'

const env = require('../lib/env')
const log = require('../lib/log')
const paths = require('../lib/paths')

const HttpServer = require('./HttpServer/HttpServer')

const httpServer = new HttpServer({
  port: env.PORT
, log: log.httpServer
, viewPath: paths.FRONTEND
, joomlaUrl: env.JOOMLA_URL
, db: {
    host: env.DB_HOST
  , user: env.DB_USER
  , password: env.DB_PASSWORD
  , database: env.DB_DATABASE
  }
})

httpServer.start()
