'use strict'

// Create server
var server

before((done) => {
  const app = require('../../../../index.js')
  const http = require('http')
  server = http.createServer(app).listen(function (err) {
    if (err) throw err
    global.request = require('supertest').agent(this)
    global.PORT = this.address().port
    done()
  })
})

require('./Users');
