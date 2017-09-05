var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// var credentials = {key: privateKey, cert: certificate};

var app = express();
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json"), "utf8"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieParser.secret));

app.use(function (req, res, next) {
  console.log(req.method + req.path);
	next();
});

require('./server/config/session') (app);
app.use('/', require('./server/router'));

// var httpServer = express.createServer();
// var httpsServer = https.createServer(credentials, app);
//
// http.get('*',function(req,res){
//     res.redirect('https://slaterobots.com'+req.url)
// });
//
// httpServer.listen(80);
// httpsServer.listen(443)

app.listen(80);
console.log('Slate Website on port 80, 443');
