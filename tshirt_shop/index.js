const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const methodOverride = require('method-override');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require('express-session');

// Connect the database
mongoose.connect('mongodb://localhost:27017/tshirt');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

// Create User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

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

// Method override
app.use(methodOverride());


// Cookie parsing
app.use(require('cookie-parser')());

// Create a static folder directory
app.use(express.static(path.join(__dirname, 'static')));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


app.use(session({
  secret: 'stanley',
  saveUninitialized: false,
  resave: false
}));


// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(require('connect-flash')());

// Add in the passport local strategy
passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'email' :  email }, function(err, user) {
          // if there are any errors, return the error
          if (err)
              return done(err);

          // check to see if theres already a user with that email
          if (user) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {

              // if there is no user with that email
              // create the user
              var newUser            = new User();

              // set the user's local credentials
              newUser.email    = email;
              newUser.password = newUser.generateHash(password);

              // save the user
              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
          }

      });
    });
}));

// Handling login
passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
    });

}));

// Create our first route
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'First app'
  });
});

// Page for login
router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login',
    message: req.flash('loginMessage')
  });
});

// Page for signup
router.get('/signup', (req, res, next) => {
  res.render('signup', {
    title: 'Signup',
    message: req.flash('signupMessage')
  });
});

router.get('/authenticated', isLoggedIn, (req, res, next) => {
  res.render('authenticated', {
    title: 'Logged in'
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
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

// Route for signup
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/authenticated',
  failureRedirect: '/signup',
  failureFlash: true // All flash messages
}));

// Route for login
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/authenticated',
  failureRedirect: '/login',
  failureFlash: true
}));

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
