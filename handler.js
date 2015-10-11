var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/public/index.html');
var db = require('./database');

module.exports = function handler(req, res) {

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.write(index);
    res.end();
  } else if(req.method === 'GET' && req.url === '/topten'){
    console.log('is this get top ten req working');
    db.tenFromList(date,username,post,res);
  }
  else if(req.method === 'POST'){
    var url = req.url;
    var urlArray = url.split('/');
    var username = urlArray[2];
    var p = urlArray[3];
    var date = urlArray[4];
    var storeNo = urlArray[5];

    var post = p.replace( /%(20)/g," ");
    db.addPostRedis(date,username,post,storeNo);
    db.addDateToList(date,username,post);
    db.tenFromList(date,username,post,res);

  }
  else if (req.method === 'DELETE') {

    var urlDel = req.url;
    var urlArray2 = urlDel.split('/');
    var deleteDate =  urlArray2[2];
    db.delPost(deleteDate, username, post, res);
   
    console.log(deleteDate,req.url,req.method,'------');
    console.log(urlDel,'---------del hand');
  }
   else {
        fs.readFile(__dirname + '/public'+req.url, function(err, file) {
            if (err) {
                res.writeHead(404, {
                    "Content-Type": "text/" + ext
                });
                console.log('error:'+err);
                res.end();
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
