var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var gd1  = fs.readFileSync('sslcert/gd1.crt', 'utf8');
var gd2  = fs.readFileSync('sslcert/gd2.crt', 'utf8');
var gd3  = fs.readFileSync('sslcert/gd3.crt', 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate,
  ca: [gd1, gd2, gd3]
};

var app = express();
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json"), "utf8"));

var usr = config.mongodb.username;
var pwd = config.mongodb.password;
var ip = config.mongodb.ip;
var dbs = config.mongodb.database;
var connectionString = "mongodb://"+usr+":"+pwd+"@"+ip+"/"+dbs;
var mongooseOptions = { server: { socketOptions: { keepAlive: 1 } } };
mongoose.connect(connectionString, mongooseOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieParser.secret));

app.use(function (req, res, next) {
  console.log(req.method + req.path);
	next();
});

require('./server/config/session') (app);
app.use('/', require('./server/router'));

var httpServer = express();
var httpsServer = https.createServer(credentials, app);

httpServer.all("*", function (req, res, next) {
  if(req.secure) {
    return next();
  };
  res.redirect('https://' + req.hostname + req.url);
});

httpServer.listen(80);
httpsServer.listen(443);

console.log('Slate Website on port 80, 443');
