const express = require('express');
const path = require('path');
const router = express.Router();


// Initialize the app
const app = express();

// Add middleware

// view engine setup to use Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Add in logger
app.use(require('morgan')('dev'));

// Add in parser
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: false }));

// Cookie parsing
app.use(require('cookie-parser')());

// Create a static folder directory
app.use(express.static(path.join(__dirname, 'static')));

// Create our first route
app.use(router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'First app'
  });
}));

app.use(router.get('/api/courses', (req, res, next) => {
  res.json({
    name: 'Stanley',
    course: 'NodeJS',
    description: 'This is going to be fun guys'
  })
}));

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app
