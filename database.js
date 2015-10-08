var redis = require('redis');
var client = redis.createClient();
var db = {};



  db.addPostRedis = function(date, username, post, res) {
    client.hmset(date, username, post);
  };


db.addDateToList = function(date, username, post, res) {
  client.rpush(["Dates", date]);
};


db.tenFromList = function(date, username, post, res) {
  client.lrange('Dates', 0, -1, function(err, reply) {
    console.log(reply);
    var pusharr = [];
    count = 0;
    for (var i = reply.length - 1; i > reply.length - 11; i--) {
      //console.log(db.getPostByDate(reply[i]));
      client.hgetall(reply[i], function(err, object) {
        console.log(JSON.stringify(object) + " TESTING");
        res.write(JSON.stringify(object) + " TESTING");
        count++;
        if (count === 10) {
          res.end();
        }
      });

    }
  });
};

module.exports = db;
