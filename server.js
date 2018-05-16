var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require("request");
var express1=require('express-validation');
var router = express.Router();
//var server = require('./server.js');
var route=require('./route');
var socket=require('socket.io');





// server.listen(config.port, config.ip, function () {
//     console.log('Express server listening on %d, in %s mode', config.port, 
//     app.get('env'));
// });

var server=app.listen(3000, function() {
  console.log("Listening on port:3000");
});





app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/dist')); 


app.use(express.static(__dirname + '/views'));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



app.use('/display',route);

var io=socket(server);
  
app.get("/",function(request,response){
  io.sockets.on('connection',function(socket){
    
    console.log('A new WebSocket connection has been established');
  
    socket.emit('message', {
      name:"pp"
    });
    

});

})


//  var port = process.env.PORT || 3000
//  app.listen(port, function() {
//    console.log("To view your app, open this link in your browser: http://localhost:" + port);
// });

module.exports=app;