var redis = require('redis');
var client = redis.createClient();
var db = {};


  db.addPostRedis = function(date, username, post) {
    client.hmset(date, username, post);
  };


  db.addDateToList = function(date) {
    client.rpush(["Dates", date]);
  };



  db.tenFromList = function(callback) {
    client.lrange('Dates', 0, -1, function(err, reply) {

			var pusharr = [];
			for(var i = reply.length-1;i>reply.length-11;i--){
				// console.log(db.getPostByDate(reply[i]));
				pusharr.push(db.getPostByDate(reply[i]));
			}

			//return reply;
			// console.log(pusharr);
    });


};

db.getPostByDate = function(date) {
  client.hgetall(date, function(err, object) {
    console.log(JSON.stringify(object) + " TESTING");
    return JSON.stringify(object);

  });
};

module.exports = db;
