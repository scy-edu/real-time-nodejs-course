'use strict'

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Import routes
const routes = require('./routes');

// Static assets
app.use(express.static(path.join(__dirname, '../static'), {
  maxAge: 86400000
}))

// Logging
app.use(require('morgan')('dev'))

// POST parsing
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

// Cookie parsing
app.use(require('cookie-parser')());

// Compression
app.use(require('compression')({
  flush: require('zlib').Z_SYNC_FLUSH
}));

// Views
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'jade');

// Plug our routes into the middleware
app.use(routes);

/* catch 404s */
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.static = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
