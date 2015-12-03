var client = require("fakeredis").createClient();
var assert = require('assert');
var db = require('./database.js');
var testindex = 1; // see: https://testanything.org/tap-version-13-specification.html
var redis = require('redis');
//var client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
var client = require("fakeredis").createClient();
var shot = require("shot");
var handler = require("./handler");
var test = require("tape");

/*assert.equal(typeof db, 'object');
assert.equal(typeof db.addPostRedis, 'function');*/

console.log("# db.addPostRedis adds a post to the database");



test( ' have we added an entry to the database', function(test){
    var request=
           { method: 'POST',
             url:  "/post/" + 'tormod' + '/' + 'i love testing' + '/' + Date.now() + '/' + Date.now()
            }
    
        shot.inject(handler,request,function (response){
                console.log(Object.keys(response));
                //console.log(response);

                var results = response.statusCode; 
                console.log(results + '>>>>>>>>>>> PAYLOAD');
                test.equal(results , 200, ' Test has passed')
                test.end();

        })

})


/*
var before;
var after;
var testDate = Date.now().toString();
console.log(testDate);

function beforeDb(callback) {
    client.dbsize(function(err, numKeys) {
        before = numKeys;
        console.log(arguments);
        callback();
        //return numKeys;
    });
}

function addDb() {
    db.addPostRedis(testDate, 'test1User', 'test1Tweet', 'test1Res', function() {
        client.dbsize(function(err, numKeys2) {
            console.log(arguments);
            console.log(before);
            after = numKeys2;
            console.log(after);
            assert.equal(before + 1, after);
            assert.end();
        });
    });
}
beforeDb(addDb);*/
