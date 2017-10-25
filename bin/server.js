#! /usr/bin/env node

const server = require('../index.js');

const path = process.env.SERVER_PATH || process.argv[2] || '.';
const port = process.env.SERVER_PORT || process.argv[3] || 8080;

server(path, port, address => {
  /* eslint-disable no-console */
  console.log(`HTTP server running at http://localhost:${address.port}`);
  /* eslint-enable no-console */
});
