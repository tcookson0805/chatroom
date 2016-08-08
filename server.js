var express = require('express');
var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

// 1. wrapping the Express app in a Node http.Server to allow Socket.IO to run alongside Express
// 2. initializing an io object by passing the server into socket_io function to create 
    //  Socket.IO server which is an EventEmitter
var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function(socket){
  console.log('Client connected');
});


server.listen(8080, function(){
  console.log('listening on port: 8080');
})