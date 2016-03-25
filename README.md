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
app.use(router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'First app'
  });
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
app.use(router.get('/api/courses', (req, res, next) => {
	res.json({
		name: 'Stanley',
		course: 'NodeJS',
		description: 'This is going to be fun'
	});
}));
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

## OAuth

## Authentication

## Real-time

## Conclusion

Discussion: 

- ReactJS vs. AngularJS
- NodeJS frameworks: Express / Hapi / Koa / Sails