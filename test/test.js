var assert = require('assert');
var db = require('../database.js');
var testindex = 1; // see: https://testanything.org/tap-version-13-specification.html
var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});


var shot = require("shot");
var handler = require("../handler");
var test = require("tape");

assert.equal(typeof db, 'object');
assert.equal(typeof db.addPostRedis, 'function');

console.log("# db.addPostRedis adds a post to the database");

var before = client.dbsize(function(err, numKeys){
    console.log (numKeys);
    return numKeys;
});


db.addPostRedis('test1', 'test1', 'test1', 'test1', function (){
  var after = client.dbsize(function(err, numKeys1){
      return numKeys1;
  });
  console.log (after);
  assert.equal(before + 1, after);
});

//
// console.log("# db.addDateToList adds a date to the dates list");
//
// var beforeList = client.llen(function("Dates", err, numKeys){
//     console.log (numKeys);
//     return numKeys;
// });
//
// db.addDateToList ('test2', 'test2', 'test2', 'test2', function (){
//   var afterList = client.llen(function("Dates", err, numKeys){
//       console.log (numKeys);
//       return numKeys;
//   });
//
//     console.log (afterList);
//     assert.equal(beforeList + 1, afterList);
// });
//


//
// test("Going to /define/care return definition", function(t) {
//   var request = {
//     method: "GET",
//     url: "/define/care"
//   };
//
//   shot.inject(handler, request, function(res) {
//     console.log("this is payload", res);
//     var payload = res.payload;
//     var result = payload.indexOf('£') > -1;
//     t.equal(result, true, "Definition retunred when requested using http");
//     t.end();
//   });
// });
//
// test("Going to null if no definition is present", function(t) {
//   var request = {
//     method: "GET",
//     url: "/define/feelingful"
//   };
//
//   shot.inject(handler, request, function(res) {
//     console.log("this is payload", res);
//     var payload = res.payload;
//     var result = payload.indexOf('null') > -1;
//     t.equal(result, true, "Definition retunred when requested using http");
//     t.end();
//   });
// });
//
