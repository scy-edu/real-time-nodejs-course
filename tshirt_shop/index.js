const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const router = express.Router();

// Connect the database
mongoose.connect('mongodb://localhost:27017/tshirt');

// Create User Schema
const User = mongoose.model('User', new mongoose.Schema({
  name: String
}));

// Create Comment Schema
const Comment = mongoose.model('Comment', new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}));

// Tshirt schema
const Tshirt = mongoose.model('Tshirt', new mongoose.Schema({
  name: String,
  comments: [Comment.schema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}));

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
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'First app'
  });
});

// Get all the shirts
router.get('/api/tshirts', (req, res, next) => {
  return Promise.resolve(
    Tshirt.find()
      .populate('comments.user')
      .exec()
  ).then((tshirts) => {
    return res.send(tshirts);
  }).catch((err) => {
    return res.status(400).send(err);
  });
});

router.post('/api/tshirts', (req, res, next) => {
  // New tshirt
  var tshirt = new Tshirt();

  // Add the data in
  tshirt.name = req.body.name;
  tshirt.user = req.body.user;

  return new Promise((resolve, reject) => {
    return tshirt.save((err, tshirt) => {
      if (err) reject(err);
      resolve(tshirt);
    });
  }).then((tshirt) => {
    return res.send(tshirt);
  }).catch((err) => {
    return res.status(400).send(err);
  });
});

router.post('/api/users', (req, res, next) => {
  var user = new User();
  user.name = req.body.name;

  return Promise.resolve(
    user.save()
  ).then((user) => {
    return res.send(user);
  }).catch((err) => {
    return res.status(400).send(err);
  });
});

router.post('/api/tshirts/:tshirt_id/comments', (req, res, next) => {
  return Promise.resolve(
    Tshirt.findOne({
      _id: req.params.tshirt_id
    }).exec()
  ).then((tshirt) => {
    tshirt.comments.push({
      content: req.body.content,
      user: req.body.user
    });

    return Promise.resolve(
      tshirt.save()
    ).then((tshirt) => {
      return res.send(tshirt);
    }).catch((err) => {
      return res.status(400).send(err);
    });
  });
});

// Add in the router
app.use('/', router);

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
