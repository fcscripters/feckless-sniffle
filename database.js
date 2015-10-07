var redis = require('redis');
var client = redis.createClient();


function db (){


function addPostRedis (date, username, post){
	client.hmset(date, username, post);	
}


function addDateToList (date){
	client.rpush(["Dates", date]);	
}



function tenFromList (){
	client.lrange('Dates', 0,10, function(err,reply){
		console.log(reply);
		return reply;
	});
}

}

function getPostByDate (date){
	client.hgetall(date, function(err, object) {
    	console.log(object + " TESTING");
    	return object;
	});
}

module.exports = db();