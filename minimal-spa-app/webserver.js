const http = require("http");
const path = require("path");
const fs   = require("fs").promises;

// Configuration
// 
// [0]  [1]          [2]  [3]    [4]
// node webserver.js port folder host

var argPort = parseInt(process.argv[2], 10);
var argFold = process.argv[3];
var argHost = process.argv[4];

if(isNaN(argPort) || argPort < 80) argPort = 8080;
if(argFold == null || argFold == '') argFold = 'src';
if(argHost == null || argHost == '') argHost = 'localhost';

var host = argHost;
var port = argPort;
var fold = argFold;

// Listener

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

// Create server

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  let folderPath = path.join(__dirname, fold);
  console.log(`Server is running on http://${host}:${port}.`);
  console.log(`${folderPath} is served.`);
});

// Utilities

function getFilePath(pathname) {
  if(!pathname || pathname == '/') return path.join(__dirname, fold, 'index.html');
  return path.join(__dirname, fold, pathname.substring(1).replace(/\//g, path.sep));
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
    case 'bmp':   return 'image/bmp';
    case 'ico':   return 'image/vnd.microsoft.icon';
    case 'map':   return 'application/json';
    case 'pdf':   return 'application/pdf';
    case 'eot':   return 'application/vnd.ms-fontobject';
    case 'otf':   return 'font/otf';
    case 'ttf':   return 'font/ttf';
    case 'woff':  return 'font/woff';
    case 'woff2': return 'font/woff2';
    case 'zip':   return 'application/zip';
    case 'mp4':   return 'video/mp4';
    case 'mpeg':  return 'video/mpeg';
    case 'webm':  return 'video/webm';
    case 'yaml':  return 'text/yaml';
    case 'yml':   return 'text/yaml';
  }
  return 'application/octet-stream';
}
