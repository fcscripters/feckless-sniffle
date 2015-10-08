var redis = require('redis');
var client = redis.createClient();
var db = {};



/*
  db.addPostRedis = function(date, username, post, res) {
    client.hmset(date, username, post);
  };


  db.addDateToList = function(date, username, post, res) {
    client.rpush(["Dates", date]);
  };



  db.tenFromList = function(date, username, post, res) {
    client.lrange('Dates', 0, -1, function(err, reply) {
     	var pusharr = [];
			for(var i = reply.length-1;i>reply.length-11;i--){
				// console.log(db.getPostByDate(reply[i]));
        var last = false;
        if (i===reply.length-11) {
          last=true;
        }
        pusharr.push(db.getPostByDate(last,reply[i],username,post,res));

			}
     });


};

db.getPostByDate = function(last, date, username, post, res) {
  client.hgetall(date, function(err, object) {
    var output = JSON.stringify(object)
    console.log(output + " TESTING");
    if (last===false){
      res.write(output);
    } else{
      res.end(output);
    }


  });
};
*/
//module.exports = postRedisDisplay();
module.exports = db;
