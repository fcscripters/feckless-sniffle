var http = require('http');
var fs = require('fs');
var handler = require('./handler.js');
var redis = require('redis');
var client = redis.createClient();
//var frontend = fs.readFileSync(__dirname + '/public/frontend.js');
var index = fs.readFileSync(__dirname + '/public/index.html');

var port = process.env.PORT || 8000;

http.createServer(handler).listen(port);
console.log('Server listening on'+ port);
