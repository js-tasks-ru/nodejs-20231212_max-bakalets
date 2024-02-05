const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  if (/\//.test(pathname)) {
    console.log(pathname, /\//.test(pathname));
    res.statusCode = 400;
    console.log('400')
    res.end('Wrong dir');
  }

  switch (req.method) {
    case 'GET':

      const stream = fs.createReadStream(filepath, {encoding: 'utf8'});
      stream.on('data', (chunk) => res.end(chunk));
      stream.on('end', () => console.log('end'));
      stream.on('error', (error) => {
        if (error.code = 'ENOENT') {
          res.statusCode = 404;
          res.end('File not found 404');
          console.log('404');
        }
        else {
          res.statusCode = 500, console.log('500');
        }
      });
      stream.on('open', () => console.log('open'));
      stream.on('close', () => console.log('close'));
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
