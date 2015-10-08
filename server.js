var http = require('http');
var fs = require('fs');
var handler = require('./handler.js');
var redis = require('redis');
var client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
client.set('foo', 'bar');
client.get('foo' , function(err, reply){
  console.log(reply.toString());
});
var index = fs.readFileSync(__dirname + '/public/index.html');
var port = process.env.PORT || 8000;
http.createServer(handler).listen(port);
console.log('Server listening on'+ port);
