
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var servo = require('servoControl');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
res.sendfile("public/index.html");
});

app.post('/tiro', function(req,res){
console.log(req.body);
var i2c = require('i2c');
var device1 = new i2c(0x18, {device: '/dev/i2c-1', debug: false});
device1.setAddress(0x4);
device1.writeByte(req.body.x, function(err) { console.log("error"); console.log(err); });
device1.writeByte(req.body.y, function(err) { console.log("error"); console.log(err); });
device1.writeByte(req.body.cor.r, function(err) { console.log("error"); console.log(err); });
device1.writeByte(req.body.cor.g, function(err) { console.log("error"); console.log(err); });
device1.writeByte(req.body.cor.b, function(err) { console.log("error"); console.log(err); });


res.status(200).send("ok");
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
