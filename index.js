const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');

function server(path, port, callback) {
  const app = new Koa();

  app.use(serve(path));
  app.use(mount('/', serve(`${path}/node_modules`)));

  app.listen(port, function() {
    if (callback instanceof Function) {
      callback(this.address());
    }
  });
}

module.exports = server;
