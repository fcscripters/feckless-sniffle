var redis = require('redis');
var client = redis.createClient();
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/public/index.html');
var db = require('./database');

module.exports = function handler(req, res) {

        if (req.method === 'GET') {
            console.log('GET');
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write(index);
            res.end();
        } else if (req.method === 'POST') {
            var url = req.url;
            var urlArray = url.split('/');
            var username = urlArray[2];
            var p = urlArray[3];
            var date = urlArray[4];
            var post = p.replace(/%(20)/g, " ");

            client.hmset(date, username, post,date);
            client.rpush(["Dates", date]);


            var listOfEntries;
            var results = [];

          


                function getRedisValue (callback){
                      client.lrange('Dates', 0, -1, function(err, reply) {
                                
                                         
                                         client.hgetall(reply[0], function(err, message) { //gets one at a time
                                         console.log(reply);
                                         console.log(message);
                                         res.write(JSON.stringify(message))
                                         
                                         callback (message);       
                                }); 
                                  
                      });
                }
                
                function forLoop() {

                     reply.forEach(getRedisValue)
                }

                getRedisValue (null, forLoop);


           client.lrange('Dates', 0, -1, function(err, reply) {
                      //var i =0; 
                               
                               client.hgetall(reply[1], function(err, message) { //gets one at a time
                               console.log(reply.length);
                               res.write(JSON.stringify(message))
                            
                                       
                      }); 
                              
                              
                        
            });
            client.lrange('Dates', 0, -1, function(err, reply) {
                      //var i =0; 
                               
                               client.hgetall(reply[2], function(err, message) { //gets one at a time
                               console.log(reply.length);
                               res.write(JSON.stringify(message))
                             
                                       
                      }); 
            });


            client.lrange('Dates', 0, -1, function(err, reply) {
                      //var i =0; 
                               
                               client.hgetall(reply[3], function(err, message) { //gets one at a time
                               console.log(reply.length);
                               res.write(JSON.stringify(message))
                               res.end()  
                                       
                      }); 
            });
            
          
            
        





        //    client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

        /*db.addPostRedis(date,username,post,res);
        db.addDateToList(date,username,post,res);
        db.tenFromList(date,username,post,res);
        // console.log(db.tenFromList());
        // res.write("---------before result is returned");
        // res.write(results);*/
        /*res.writeHead(200, {
            "Content-Type": "text/html"
        });
*/

    //} else if (req.method === 'DELETE') {



    } else {
        fs.readFile(__dirname + req.url, function(err, file) {
            if (err) {
                res.writeHead(404, {
                    "Content-Type": "text/" + ext
                });

            } else {
                var ext = req.url.split('.')[1];
                res.writeHead(200, {
                    "Content-Type": "text/" + ext
                });
                res.end(file);
            }
        });
    }
};
