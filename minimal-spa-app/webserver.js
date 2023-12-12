const http = require("http");
const path = require("path");
const fs   = require("fs");

// Configuration
// 
// [0]  [1]          [2]  [3]    [4]  [5]
// node webserver.js port folder host root
// 
// Defaults:
// node webserver.js 8080 src localhost index.html

var port = parseInt(process.argv[2], 10);
var fold = process.argv[3];
var host = process.argv[4];
var root = process.argv[5];

if(isNaN(port) || port < 80) port = 8080;
if(!fold) fold = 'src';
if(!host) host = 'localhost';
if(!root) root = 'index.html';

// Listener

const requestListener = function (req, res) {
  let filePath = getFilePath(req.url);
  let contType = getContentType(filePath);

  if(req.method == 'HEAD' || req.method == 'OPTIONS') {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if(err) {
        res.writeHead(404); // Not Found
        res.end();
        console.log(new Date().toLocaleString() + ' ' + req.method + ' ' + req.url + ' 404');
      }
      else {
        res.setHeader("Content-Type", contType);
        res.setHeader("Access-Control-Allow-Origin",  "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.writeHead(204); // No Content
        res.end();
        console.log(new Date().toLocaleString() + ' ' + req.method + ' ' + req.url + ' 204');
      }
    });
  }
  else {
    fs.readFile(filePath, (err, data) => {
      if(err) {
        res.writeHead(404); // Not Found
        res.end();
        console.log(new Date().toLocaleString() + ' ' + req.method + ' ' + req.url + ' 404');
      }
      else {
        res.setHeader("Content-Type", contType);
        res.setHeader("Content-Length", data.length);
        res.setHeader("Access-Control-Allow-Origin",  "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.writeHead(200); // OK
        res.end(data);
        console.log(new Date().toLocaleString() + ' ' + req.method + ' ' + req.url + ' 200');
      }
    });
  }
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
  if(!pathname || pathname == '/') return path.join(__dirname, fold, root);
  return path.join(__dirname, fold, pathname.substring(1).replace(/\//g, path.sep));
}

function getContentType(filePath) {
  if(!filePath) return 'application/json';
  let sep = filePath.lastIndexOf('.');
  if(sep < 0) return 'application/json';
  let ext = filePath.substring(sep + 1).toLowerCase();
  switch(ext) {
// code
    case 'js':    return 'text/javascript';
    case 'mjs':   return 'text/javascript';
    case 'html':  return 'text/html';
    case 'htm':   return 'text/html';
    case 'css':   return 'text/css';
    case 'map':   return 'application/json';
    case 'wasm':  return 'application/wasm';
// data
    case 'json':  return 'application/json';
    case 'txt':   return 'text/plain';
    case 'csv':   return 'text/csv';
    case 'yaml':  return 'text/yaml';
    case 'yml':   return 'text/yaml';
// xml
    case 'xml':   return 'application/xml';
    case 'xsd':   return 'application/xml';
    case 'xsl':   return 'application/xslt+xml';
// images
    case 'png':   return 'image/png';
    case 'gif':   return 'image/gif';
    case 'jpg':   return 'image/jpeg';
    case 'jpeg':  return 'image/jpeg';
    case 'svg':   return 'image/svg+xml';
    case 'webp':  return 'image/webp';
    case 'bmp':   return 'image/bmp';
    case 'tif':   return 'image/tiff';
    case 'tiff':  return 'image/tiff';
    case 'ico':   return 'image/vnd.microsoft.icon';
// font
    case 'eot':   return 'application/vnd.ms-fontobject';
    case 'otf':   return 'font/otf';
    case 'ttf':   return 'font/ttf';
    case 'woff':  return 'font/woff';
    case 'woff2': return 'font/woff2';
// applications
    case 'pdf':   return 'application/pdf';
    case 'zip':   return 'application/zip';
    case 'gz':    return 'application/gzip';
    case 'gzip':  return 'application/gzip';
    case 'tar':   return 'application/x-tar';
// video
    case 'mp4':   return 'video/mp4';
    case 'mpeg':  return 'video/mpeg';
    case 'webm':  return 'video/webm';
// audio
    case 'mp3':   return 'audio/mpeg';
    case 'oga':   return 'audio/ogg';
    case 'ogg':   return 'audio/ogg';
    case 'weba':  return 'audio/webm';
  }
  return 'application/octet-stream';
}
