var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
var db = {};



  db.addPostRedis = function(date, username, post, storeNo, res) {
    client.hmset(date, "username", username, "post", post,"storeNo",storeNo,"date",date);
  };


db.addDateToList = function(date, username, post, res) {
  client.rpush(["Dates", date]);

};

db.delPost = function(date){

    client.del(date, function (err,reply) {
      // body...
    });
};


db.tenFromList = function(date, username, post, res) {
  client.lrange('Dates', 0, -1, function(err, reply) {
    var pusharr = [];
    count = 0;
    for (var i = reply.length - 1; i > reply.length - 11; i--) {
      var frontarr = [];
      //console.log(db.getPostByDate(reply[i]));
      client.hgetall(reply[i], function(err, object) {
        frontarr.push(object);
        count++;
        if (count === 10) {
          // console.log(frontarr);
          res.end(JSON.stringify(frontarr));
        }
      });

    }
  });
};

module.exports = db;
