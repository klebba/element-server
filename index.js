const st = require('node-static');
const http = require('http');

function server(name, path, port, host, callback) {
  const fileServer = new st.Server(path, {
    cache: 0,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

  // prettier-ignore
  http.createServer((request, response) => {
    request.addListener('end', () => {
      const base = `/node_modules/${name}`;
      const forward = request.url.startsWith('/node_modules') === false;
      const file = request.url.replace(base, '');
      if (forward) {
        response.writeHead(302, {'Location': `/node_modules/${name}${file}`});
        response.end();
      } else {
        fileServer.serve(request, response, (err, result) => {
          // alias /node_modules/module-name to /
          if (err && err.status === 404) {
            request.url = file;
            fileServer.serve(request, response);
          }
        });
      }
    }).resume();
  }).listen(port, host, function() {
    if (callback instanceof Function) {
      callback(this.address());
    }
  });
}

module.exports = server;
