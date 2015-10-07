var fs = require('fs');
var index = fs.readFileSync(__dirname + '/public/index.html');

module.exports = function handler(req, res) {
  console.log('im in the handler');

  if (req.method === 'GET') {
    console.log('GET');
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.write(index);
    res.end();
  }else if(req.method === 'POST'){
    console.log(req.url);
    var url = req.url;
    var urlArray = url.split('/');
    var username = urlArray[2];
    var p = urlArray[3];
    var date = urlArray[4];
    var post = p.replace( /%(20)/g," ");
    console.log('POST');
    console.log(post);
    console.log(username);
    console.log(date);
    res.end();
  }else if (req.method === 'DELETE') {
    


  }
  else{
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
