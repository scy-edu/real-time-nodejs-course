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

JS now has taken over the world -- with the overall improvements to the browsers and computers / mobile devices, JS can handle any general purpose task from web apps to mobile and desktop apps. 

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

## Setting up Express

## Front-End

## Bundler

## Back-End

## OAuth

## Authentication

## Real-time

## Conclusion

Discussion: 

- ReactJS vs. AngularJS
- NodeJS frameworks: Express / Hapi / Koa / Sails