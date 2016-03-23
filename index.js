var Process = require('child_process');
var FRED=require('rest.js');
require('events').EventEmitter.prototype._maxListeners = 0;
var http=require('http');
var express = require('express');

var app = express();
var server = http.createServer(app).listen(8500); //required fro socket.io
var io = require('socket.io').listen(server);

app.use(express.static('assets'));
app.get('*', function(req, res){
  res.sendFile(__dirname +'/assets/index.html');
});

var genericDataFunction=function(data, fullData, callback){
  data=data.split(/\\n/g);
  var n=data.length;
  data[0]=fullData+data[0];
  for(var i=0; i<(n-1);i++){
    callback(data[i]);
    return "";
  }
  if(n===1){
    //callback(data[0]);
    return data[0];
  }
}
io.on('connection', function (socket) {
  var child=Process.spawn('cpp/./MarketRisk',
  {
    stdio:[
      'pipe',
      'pipe',
      'pipe'
    ]
  });
  var fred=new FRED(function(data){
    child.stdin.write(JSON.stringify(data));
    child.stdin.write("\n");
  });
  //var sendFred={};
  var response="";
  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data',function(data){
    //console.log(data);
    var tmpResponse=response;
    tmpResponse=genericDataFunction(data, tmpResponse, function(data){
      data=JSON.parse(data);
      if(data.Forward||data.Spot){
        socket.emit('Fred', data);
      }
      else if(data.percent){
        socket.emit('progress', data);
      }
      else if(data.Overview){
        socket.emit('Overview', data.Overview);
      }
      else if(data.RC){
        //console.log(data);
        socket.emit('RC', data.RC);
      }
      else if(data.bins){
        socket.emit('bins', data);
      }
      else{
        console.log(data);
      }
      //response="";
    });
    response=tmpResponse;
    socket.on('disconnect', function(){
      child.kill();
    });
  });
  child.stderr.on('data',function(data){
    console.log(''+data);
  });
  child.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
  socket.on('parameters', function(data){
  //  console.log(data);
    child.stdin.write(JSON.stringify(data));
    child.stdin.write("\n");
    //JSON.stringify({portfolio:portfolio, global:submissionArray})
  })

});
