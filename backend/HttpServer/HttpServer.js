'use strict'

const _ = require('lodash')
const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const mysql = require('mysql')
const pug = require('pug')

const QUERY = 'select title, introtext from joomla_content where alias = '

class HttpServer {
  constructor(options) {
    this.viewPath = options.viewPath
    this.joomlaUrl = options.joomlaUrl

    this.server = new Hapi.Server({
      connections: {
        routes: {
          files: {
            relativeTo: this.viewPath
          }
        }
      }
    })

    this.db = mysql.createConnection(options.db)
    this.db.connect()

    this.connect({
      port: options.port
    })

    this.register(Vision, this.handleVisionRegister.bind(this))
    this.register(Inert)

    this.get('/', this.handleGetIndex.bind(this))
    this.get('/{category}/{page?}', this.handleGetPage.bind(this, null))
    this.get('/firm/partners/{page}', this.handleGetPage.bind(this, 'firm'))
    this.get('/assets/{param*}', {
      directory: {
        path: './assets'
      , redirectToSlash: false
      , index: false
      }
    })
    this.get('/images/{param*}', {
      directory: {
        path: './images'
      , redirectToSlash: false
      , index: false
      }
    })
  }

  connect(...args) {
    this.server.connection(...args)
  }

  register(...args) {
    this.server.register(...args)
  }

  get(path, handler) {
    this.server.route({
      method: 'get'
    , path
    , handler
    })
  }

  start(handler) {
    this.server.start(handler || this.handleStart)
  }

  handleVisionRegister(error) {
    if (error) {
      throw error
    }

    this.server.views({
      engines: {pug}
    , path: this.viewPath
    })
  }

  handleGetIndex(request, response) {
    response.view('index')
  }

  handleGetPage(category, request, response) {
    const page =
      request.params.page || request.params.category

    const imagesUrl = `${this.joomlaUrl}/images/`

    function handleQuery(error, rows) {
      if (error) {
        return response.view('page')
      }

      response.view('page', {
        category: request.params.category || category
      , content: _.get(rows, '0.introtext', '404')
          .replace(/images\//g, imagesUrl)
      })
    }

    this.db.query(`${QUERY} "${page}"`, handleQuery)
  }

  handleGetStylesheet(request, response)  {
    response.file('stylesheet.css')
  }

  handleGetSplashAnimation(request, response) {
    response.file('splash-animation.js')
  }
}

module.exports = HttpServer
