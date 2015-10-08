var redis = require('redis');
var client = redis.createClient();
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/public/index.html');
var db = require('./database');

module.exports = function handler(req, res) {
  console.log('im in the handler');

  if (req.method === 'GET') {
    console.log('GET');
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.write(index);
    res.end();
  } else if(req.method === 'POST'){
    var url = req.url;
    var urlArray = url.split('/');
    var username = urlArray[2];
    var p = urlArray[3];
    var date = urlArray[4];
    var post = p.replace( /%(20)/g," ");
    db.addPostRedis(date,username,post);
    db.addDateToList(date,username,post);
    db.tenFromList(date,username,post,res);


    // console.log(db.tenFromList());
    // res.write("---------before result is returned");
    // res.write(results);
    res.writeHead(200, {
      "Content-Type": "text/html"
    });


  }else if (req.method === 'DELETE') {



  }

   else {
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
