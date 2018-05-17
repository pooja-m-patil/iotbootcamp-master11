var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require("request");
var express1=require('express-validation');
var router = express.Router();
//var server = require('./server.js');
var route=require('./route');
var socketIo=require('socket.io');
var disc=require('./discovery');
var status;
var auth;
var deviceId;
var temp;


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

var io=socketIo(server);
  
app.post("/",function(req,res){

    if(req.body.deviceId){
      deviceId=req.body.deviceId;
    }
    if(req.body.added){
      status=true;
      auth=req.body.added;
    }
    if(req.body.id){
      temp=req.body.id;
    }
  
    console.log(status);
  if(status){
    console.log(status);
    console.log(temp);
    console.log(deviceId);
    if(temp==deviceId){
    
     
    res.send(auth);
    }
    else{
      res.send("");
    }
  }
  else{
    var dId=req.body.deviceId;
    console.log(dId);
    //To store in db
    // disc.deviceDisc(deviceId,desc,function(data){
    //   res.send(data);
    // })
    io.on('connection',(socket)=>{
   //console.log("A new WebSocket connection has been established");
    socket.emit('message', 
      {devId:dId}
    )
  })

  res.send("");
}
})


//  var port = process.env.PORT || 3000
//  app.listen(port, function() {
//    console.log("To view your app, open this link in your browser: http://localhost:" + port);
// });

module.exports=app;