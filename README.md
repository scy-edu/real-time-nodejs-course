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

Let's watch this video: <video src='https://www.youtube.com/watch?v=8aGhZQkoFbQ' />

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