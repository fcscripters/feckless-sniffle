var redis = require('redis');
var client = redis.createClient();


client.hmset('Conor', '10/09/2015', 'AngularJS', '11/09/2015', 'Bootstrap', '12/09/2015', 'Express');

client.hmset( '10/09/2015', 'AngularJS', '11/09/2015', 'Bootstrap', '12/09/2015', 'Express');
