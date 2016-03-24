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

