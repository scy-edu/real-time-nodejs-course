# NodeJS Course

### Requirements:

- A personal computer (Mac OSX preferred)
- Understanding of HTML / CSS
- Intermediate understanding of JS
- Homebrew or equivalent package manager installed
- Heroku account

If you have a **Windows Computer**, use Cloud9 (https://c9.io/) or Nitrous (https://www.nitrous.io/) for this course.

With **Cloud9**, you will already have Mongo installed. 

Run these commands to make it work:

[MongoDB Setup with Cloud9](https://docs.c9.io/docs/setting-up-mongodb)

### Topics covered:-	NodeJS-	NPM-	Debugging NodeJS-	Express-	Webpack-	ES2015-	Jade-	MongoDB & Mongoose-	OAuth with Facebook and Twitter-	JWTs (JSON web tokens)-	TDD (test-driven development) with Mocha & Chai-	Callbacks, Promises, and Emitters-	Socket.io### Set up your work environment

Follow the guidelines here to setup your Mac OSX envirnment for programming:

[Perfect OSX NodeJS setup](https://www.stanleycyang.com/tutorials/the-perfect-mac-os-x-setup-for-web-development)

## NodeJS: An Introduction

Node.JS is by far the most popular implementation of server-side JavaScript created by Ryan Dahl. 

There were other implementations (**io.js** [merged back with NodeJS], **GromJS** [Interpreter for JS on the server-side], **jaggery.js**).

JS has come a long way since 1995 when it was created by Brendan Eich. It used to be regarded mostly as a hobbyist language.

NodeJS specialties lie in streaming and I/O. Node Package Manager has over 250,000 third-party packages. Take a look [here](https://www.npmjs.com/).

JS now has taken over the world [Githut Statistic](http://githut.info/) -- with the overall improvements to the browsers and computers / mobile devices, JS can handle any general purpose task from web apps to mobile and desktop apps. 

### Basis of NodeJS: A simple web server

It's really easy to make a server with NodeJS! 

In your terminal:

```bash
$ mkdir -p nodejs_course/webserver
$ cd nodejs_course
$ touch webserver/index.js
```

Write this code into `webserver/index.js`:

```js
'use strict'

const http = require('http');
const PORT = 1337

// Create a basic server
const server = http.createServer((req, res) => {

  // Write HTTP Header
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  // Write a message
  res.end('Hello World! You hit: ' + req.url);

}).listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}`);
})
```

```bash
$ node webserver/index.js
```

Now visit **localhost:1337/** and see your basic server at work!

## Understanding IO

**IO (Input / Output)** is the slowest part of any computing system. Once your app is receiving hundreds or thousands of request, IO can cripple your application.

<img src='http://images.slideplayer.com/16/5211283/slides/slide_2.jpg' />

1. A person visits your website. They need information about books under the category of fantasy

2. Databases are housed remotely. Your webserver sends a database query to get the requested data

3. The database grabs the results and sends it to the web server

4. The web server receives the results and sends it back as JSON

5. The result is sent to the correct web page and returns the appropriate HTML

### Walmart Case Study

[Case study](https://blog.risingstack.com/node-js-is-enterprise-ready/)

## Blocking Vs. Non-blocking code

In most languages, the execution is synchronous. That means the current code block prevents the code behind it from executing in the call stack.

JavaScript in nature is non-blocking. It has solutions built into it's core:

- Callbacks
- Emitters
- Promises

[Good event loop reference](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

JavaScript run-time can only do one thing at a time. It uses WebAPIs (browser) and C++ APIs (NodeJS) to execute code concurrently.

When code finishes executing in the WebAPIs, it moves into the task (callback) queue. The event loop looks at the stack then at the task queue. When the stack is clear, the event loop moves the callback back into the callstack.

```js
// Sync code
console.log('hello kind folks');

// Gets called when the stack is cleared
setTimeout(() => {
	console.log('there');
}, 0);

// Sync code
console.log('Awesome');
```

The callback makes the setTimeout async. You will see that even though the setTimeout is set at **0**, it will get called when the call stack is cleared (after the execution of both console.log) due to the event loop.

## Getting into the Node Package Manager (NPM)

First off, check your version of your npm:

```js
npm -v
```

Mine is currently on 3.8.2.

More info on versioning (**major.minor.path**): [versioning](http://blog.npmjs.org/post/115305091285/introducing-the-npm-semantic-version-calculator)

## Basic commands

**npm install**

Use `npm install -g [package]` to install packages globally.

Use `npm install --save [package]` to install packages locally

Curious whether a package exists? Check [NPM](npm.org) or run the search command:

```bash
$ npm search [package name]
```

Note that this runs slowly on the first query.

### Creating our first module: CALCJS

```bash
$ mkdir calcjs
$ cd calcjs
$ npm init
```

Go through the set of instructions. Open up your `package.json`

```js
{
  "name": "calcjs",
  "version": "1.0.0",
  "description": "The first module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stanley C Yang <stanley@stanleycyang.com> (http://www.stanleycyang.com)",
  "license": "ISC"
}
```

Let's install our first module~

```js
$ npm install -S mathjs
```

Our module will look like this: 

```js
'use strict'

// Import dependencies
const math = require('mathjs')

/*
 * CALCJS. LOVE OUR MODULE!!!
 */

exports.add = function (num1, num2) {
  return math.eval(num1 + num2);
}

exports.subtract = function (num1, num2) {
  return math.eval(num1 - num2);
}

exports.multiply = function (num1, num2) {
  return math.eval(num1 * num2);
}

exports.divide =  function (num1, num2) {
  return math.eval(num1 / num2);
}

// Students will perform this part

exports.round = function (num1, roundTo) {
  return math.round(num1, roundTo);
}

exports.sqrt = function (num) {
  return math.sqrt(num);
}

```

In a file called `calculate.js`:

```js
'use strict'

const math = require('./index.js')

console.log(math.add(12,5));
console.log(math.subtract(12,5));
console.log(math.multiply(12,5));
console.log(math.divide(12,5));
console.log(math.round(10.321321, 2));
console.log(math.sqrt(500));
```

Move `calculate.js` to a demo folder. Then go into the root of calcjs and run **npm link**. Then go into the demo folder and run **npm link calcjs**

In `calculate.js`:

```js
'use strict'

const math = require('calcjs')

console.log(math.add(12,5));
console.log(math.subtract(12,5));
console.log(math.multiply(12,5));
console.log(math.divide(12,5));
console.log(math.round(10.321321, 2));
console.log(math.sqrt(500));
```

You have written your first module! To publish it to npm, just create an account and run npm publish.

## Setting up Express

Begin our first express app by starting in our terminal:

```bash
$ mkdir tshirt_shop
$ cd tshirt_shop
$ npm init -f
$ npm i -S body-parser cookie-parser cors debug express jade mongoose morgan
```

Let's create our server (`bin/www`):

```js
#! usr/bin/env node
'use strict'

const http = require('http');
const PORT = 3000;
const app = require('../index.js');

// Create HTTP server
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', onListening);

// To listen in
function onListening() {
  const address = server.address().port
  console.log(`Listening on port ${address}`);
}
```

Add the middleware in `index.js`:

```js
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
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'First app'
  });
});

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
```

Create the views (`views/layout.jade`):

```jade
doctype html
html
  head
    title= title
  body
    block content
```

`views/index.jade`:

```jade
extends layout

block content
  h1= title
  p Welcome to #{title}
```

`views/error.jade`:

```jade
extends layout

block content
  h1= message
  h2= error.status
```

### Creating an API

In `index.js`

```js
router.get('/api/courses', (req, res, next) => {
	res.json({
		name: 'Stanley',
		course: 'NodeJS',
		description: 'This is going to be fun'
	});
});
```

Navigate to http://localhost:3000/api/courses and you'll see that we have created an API!

### Debugging

We're going to debug with **[node-inspector](https://github.com/node-inspector/node-inspector)**

**Install:**

```bash
$ npm install -g node-inspector
```

**To run it:**

```bash
$ node --debug bin/www

to start with an breakpoint immediately:

$ node --debug-brk bin/www
```

This gives a clean interface (Chrome debugger) to examine the code. If you use Chrome for your front-end debugging, you'll be right at home!

You can step through the code, and examine the call stack and the variables to understand what is going on.

## Front-End

### Installing Bower

```js
$ bower init
$ echo '{"directory": "static/vendor/"}' >> .bowerrc
$ bower install bootstrap#v4.0.0-alpha.2 -S
```

## Bundler

We're going to use [webpack](https://webpack.github.io/) to bundle our assets

In your terminal:

```bash
$ npm i -S webpack style-loader css-loader
$ touch webpack.config.js
```

Let's set up your webpack:

```js
module.exports = {
  entry: "./client/index.js",
    output: {
        path: __dirname,
        filename: "./static/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
```

Create a client folder with all your files:

```bash
$ mkdir -p client/styles
$ touch client/index.js client/styles/index.css
```

Try some basic styling (`client/styles/index.css`):

```css
body {
	background: red;
	font-size: 1.3rem;
}
```

Require the code into your webpack entry point (`client/index.js`):

```js
// Bring in the styling
require('./styles/index.css');
document.write('It works.');
```

You can continue to require the files as you go along!

Include your code into `index.jade`:

```jade
...
script(src='bundle.js')
...
```

To keep refreshing your updates as they come through:

```bash
$ webpack --progress --colors --watch
```

Your webpack bundler is all setup!

## Back-End

### MongoDB

MongoDB was create by 10gen, who wanted to make an open-sourced scalable database for hu'mongo'us data. It's written in C++.

Check out their website [here](https://www.mongodb.org/).

### Features of MongoDB

- Key-value storage
- Binary JSON (BSON, pronounced Bi-Son)
- Components: database, collections, and documents
- Databases have many collections
- Collections have many documents
- Documents contain the key-value pairs
- Documents are dynamic. They do not beholden to the same sets of fields or structures

### For SQL users

- Database = Database
- Table = Collection
- Row = Document
- Column = Field
- Joins = Embedded documents

### Limits

- BSON document limit is 16 megabytes. 
- It supports no more than 100 levels of nesting. 
- A collection can have no more than 64 indexes

### Thought Process

You should always default to thinking in embedding first when doing MongoDB. 

If the data will exceed your 16MB limit per document, then reference it!

### Referencing

You can either a) reference the ID in an array in the document or b) reference the parent ID in the child.

Case B is used when the data is enormous.

## Mongo Shell

It's easy to access the shell!

In your terminal:

```bash
$ mongod
$ mongo
```

### Embedding with Mongo

```bash
$ db.people.insert({name: 'Stanley Yang'})
$ var stanley = db.people.findOne(INSERT_OBJECTID)
$ stanley.phoneNumbers = [
	636-263-1234,
	123-345-6554,
	922-233-1234
]
$ db.people.remove(INSERT_OBJECTID)
```

### Referencing with Mongo

```bash
$ db.person.insert({
	name: 'Stanley Yang',
	age: 21
})
$ db.phoneBook.insert({
	people: [
		user1._id
	]
})
$ db.phoneBook.find()
```

### Mongoose

Let's begin by adding this snippet to `index.js`:

```js
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
```

Then get started with a few API endpoints to `index.js`:

```js
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
```

### TDD

```bash
$ npm i -SD mocha chai request supertest
$ mkdir test
$ touch test/index.js test/mocha.opts
```

In `mocha.opts`:

```js
--reporter spec
--bail
--timeout 5m
```

In `test/server/api/models/User.js`:

```js
use strict'

const mongoose = require('mongoose')
const expect = require('chai').expect

const User = mongoose.model('User');

describe('User', () => {
  var user

  // Setup
  before(() => {
    user = new User({
      name: 'Stanley Yang'
    });
  })

  describe('attributes', () => {

    it('created an user object', () => {
      expect(typeof person).to.be.an.object
    });

    it('should have a String for name', () => {
      expect(user.name).to.be.a('string')
    });

  });

  describe('#save', () => {

    it('should save without problems', (done) => {
      user.save(done);
    });

    it('should GET the user', (done) => {
      User.findById(user._id, (err, _user) => {
        expect(user._id.toString()).to.equal(_user.id);
        done();
      });
    });

  });

  describe('#validate', () => {
    it('should persist the name', (done) => {
      User.findById(user._id, (err, _user) => {
      expect(err).to.be.a('null');
        expect(_user).to.be.an('object');
        expect(_user.name).to.be.a('string');
        done();
      });
    });
  });



  // Cleanup
  after((done) => {
    User.remove({
      _id: {
        $in: [
          user._id
        ]
      }
    }).exec(done);
  })

});
```
In our `test/index.js`, we're going to create a single entry point for our tests:

```js
'use strict'

require('../index.js');
require('./server/api/models/index.js');

```

To test it, run `test/index.js`!

We've finished testing our User model!

## OAuth & Authentication

```bash
$ npm i -S express-session passport-local passport-facebook bcrypt-nodejs dotenv
```

Add this lines to the top of our `index.js`:

```js
const bcrypt = require('bcrypt-nodejs');
const methodOverride = require('method-override');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require('express-session');

...

// Middleware for when we're logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

// Refactor User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  facebook: {
  	id: String,
  	name: String,
  	token: String
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
```

We're going to need some middleware to make our passport functional (`index.js`):


```js
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
```

Beneath that, add the code to tie our backend with the authentication:

```js
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

...

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
```

Create our views:

`views/authenticated.jade`:

```js
extends layout

block content
  h1= title
  a(href='/logout') Logout
```

`views/login.jade`:

```js
extends layout

block content
  h1= title
  h2= message
  form(action='/login' method='post')
    input(type='text' name='email' placeholder='Email')
    input(type='password' name='password' placeholder='Password')
    button(type='submit') Login

  p Don't have an account?
    a(href='/signup') Signup
  a(href='/') Home
```

`views/signup.jade`:

```js
extends layout

block content
  h1= title
  h2= message
  form(action='/signup' method='post')
    input(type='text' name='email' placeholder='Email')
    input(type='password' name='password' placeholder='Password')
    button(type='submit') Signup

  p Already have an account?
    a(href='/login') Login
  a(href='/') Home
```

Our local authentication should work at this point! Try it out!

### Facebook Authentication

To make Facebook authentication work we're going to need the `dotenv` module to hide our private keys.

In your terminal:

```js
$ npm i -S dotenv passport-facebook
$ touch .env
```

In the `.env` file, we can store everything we don't want to get pushed in Github. Store your Facebook keys in:

```js
FACEBOOK_CLIENT_ID=YOURCLIENTID
FACEBOOK_CLIENT_SECRET=YOURCLIENTSECRET
```

At the very top of our `index.js`, add this line of code to load the environmental variables:

```js
require('dotenv').config();

...

// Bring in Facebook Strategy
const FacebookStrategy = require('passport-facebook').Strategy
```
Now below the place where you brought in `connect-flash`, put this snippet in `index.js`:

```js

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback'
}, (token, refreshToken, profile, done) => {
  User.findOne({
    'facebook.id': profile.id
  }, function (err, user) {
    if (err) return done(err);
    if (user) {
      return done(null, user);
    } else {
      var newUser = new User();

      newUser.facebook.id = profile.id;
      newUser.facebook.token = token;
      newUser.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`,

      newUser.save((err) => {
        if (err) throw err;
        return done(null, newUser);
      });
    }
  });
}));

```

Configure the routes to allow us to use Facebook login:

```js
...
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/authenticated',
  failureRedirect: '/'
}));
...
```

In `signup.jade`, add this button to use Facebook Login:

```js
...
a(href='/auth/facebook') Sign up with Facebook
...
```

You can now login through Facebook!

## Real-time

Setting up the real-time app

```js
{
  "name": "real-time-game",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node bin/www"
  },
  "author": "Stanley C Yang <stanley@stanleycyang.com> (http://www.stanleycyang.com)",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.15.0",
    "compression": "^1.6.1",
    "cookie-parser": "^1.4.1",
    "express": "^4.13.4",
    "jade": "^1.11.0",
    "mongoose": "^4.4.10",
    "morgan": "^1.7.0",
    "socket.io": "^1.4.5"
  }
}
```

In the `bin/www`:

```js
#! /usr/bin/env node

'use strict'

// Bring in the app
const app = require('../server/index.js');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
  console.log('a user has connected');

  socket.on('color click', function (data) {
    io.emit('color click', data);
  });

  // Listen for disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Listen on the PORT
http.listen(PORT, function() {
  console.log(`Listening on ${this.address().port}`);
});
```
In `server/index.js`:

```js
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
```

In `static/index.js`:

```js
var socket = io()

var container = document.querySelector('#container');

function randomColor() {
  var colors = ['#2E9AFE', '#40FF00', '#FFBF00', '#FE2EF7', '#FA5858', '#4000FF', '#FE2E9A', '#CEF6E3', '#04B45F'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Handle the bubbling
function bubbleUp(data) {
  var x = data.x,
      y = data.y,
      color = data.color

  var bubble = document.createElement('div.bubble');

  // Set the left and top
  bubble.style.position = 'absolute';
  bubble.style.left = `${x - 50}px`;
  bubble.style.top = `${y - 50}px`;
  bubble.style.backgroundColor = color;
  bubble.style.padding = '50px';
  bubble.style.borderRadius = '50%';
  bubble.style.transition = 'all 1s ease-out';
  bubble.style.pointerEvents = 'none';

  container.appendChild(bubble);

  setTimeout(function () {
    bubble.style.padding = '100px';
    bubble.style.opacity = '0';
  }, 200);

  bubble.addEventListener('transitionend', function() {
    bubble.remove();
  }, false);

}


container.onclick = function(e) {
  var data = {
    x: e.offsetX,
    y: e.offsetY,
    color: randomColor()
  }
  
  // Emit the message
  socket.emit('color click', data);
  return false;
}

socket.on('color click', function (data) {
  bubbleUp(data);
});
```

In `static/styles/index.css`:

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

body {
  background: -webkit-linear-gradient(rgba(135, 60, 255, 0.4), rgba(135, 60, 255, 0.0) 80%), -webkit-linear-gradient(-45deg, rgba(120, 155, 255, 0.9) 25%, rgba(255, 160, 65, 0.9) 75%);
}

#container {
  width: 900px;
  height: 500px;
  background-color: #eee;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
  overflow: hidden;
}

.shadow {
  -moz-box-shadow:    inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow:         inset 0 0 10px #000000;
}
```

In `client/views/index.jade`:

```jade
extends layout

block content
  div#container.shadow
  script(src='/socket.io/socket.io.js')
  script(src='/index.js')
```

In `client/views/layout.jade`:

```jade
doctype html
html
  head
    title=title
    link(rel='stylesheet' href='/styles/index.css')
  body
    block content
```

In `client/views/error.jade`:

```js
extends layout

block content
  h1= message
  h2= error.status
  pre #{error.stack}
```

Your real-time app is complete!

## Conclusion

Discussion: 

- ReactJS vs. AngularJS
- NodeJS frameworks: Express / Hapi / Koa / Sails