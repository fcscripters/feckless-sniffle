var fs = require ('fs');
var index = fs.readFileSync(__dirname + '/public/index.html');

module.exports=function handler(req, res){
  if (req.url.length === 1){
    res.writeHead(200, {
      "Content-Type" :"text/html"
    });
    res.end('Hello World');
  }
};
