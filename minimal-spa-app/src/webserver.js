const http = require("http");
const path = require("path");
const fs   = require('fs').promises;

const host = 'localhost';
const port = 8080;

const requestListener = function (req, res) {
  let filePath = getFilePath(req.url);
  let contType = getContentType(filePath);
  console.log('[http] ' + req.method + ' ' + req.url + ' -> ' + filePath);

  fs.readFile(filePath)
    .then(contents => {
      res.setHeader("Content-Type", contType);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200);
      res.end(contents);
    })
    .catch(err => {
      res.writeHead(404);
      res.end();
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

function getFilePath(pathname) {
  if(!pathname || pathname == '/') return path.join(__dirname, 'index.js');
  return path.join(__dirname, pathname.substring(1).replace(/\//g, path.sep));
}

function getContentType(filePath) {
  if(!filePath) return 'text/javascript';
  let sep = filePath.lastIndexOf('.');
  if(sep < 0) return 'text/javascript';
  let ext = filePath.substring(sep + 1).toLowerCase();
  switch(ext) {
    case 'js':    return 'text/javascript';
    case 'mjs':   return 'text/javascript';
    case 'html':  return 'text/html';
    case 'htm':   return 'text/html';
    case 'css':   return 'text/css';
    case 'json':  return 'application/json';
    case 'xml':   return 'application/xml';
    case 'txt':   return 'text/plain';
    case 'csv':   return 'text/csv';
    case 'png':   return 'image/png';
    case 'gif':   return 'image/gif';
    case 'jpeg':  return 'image/jpeg';
    case 'jpg':   return 'image/jpeg';
    case 'svg':   return 'image/svg+xml';
    case 'webp':  return 'image/webp';
    case 'ico':   return 'image/vnd.microsoft.icon';
    case 'map':   return 'application/json';
    case 'pdf':   return 'application/pdf';
    case 'eot':   return 'application/vnd.ms-fontobject';
    case 'otf':   return 'font/otf';
    case 'ttf':   return 'font/ttf';
    case 'woff':  return 'font/woff';
    case 'woff2': return 'font/woff2';
    case 'zip':   return 'application/zip';
  }
  return 'text/javascript';
}
