var express = require('express');
var socket_io = require('socket.io');
var http = require('http');


var app = express();
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// 1. wrapping the Express app in a Node http.Server to allow Socket.IO to run alongside Express
// 2. initializing an io object by passing the server into socket_io function to create 
    //  Socket.IO server which is an EventEmitter
var server = http.Server(app);
var io = socket_io(server);

// adding listener to connection event of the server
io.on('connection', function(socket){
  console.log('Client connected');
  
  
  // added new listener to the socket which is used to communicate with the client
  socket.on('message', function(message){
    console.log('Received message:', message);
    
    // broadcasts the message to any other clients who are connected
    socket.broadcast.emit('message', message);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
});


server.listen(8080, function(){
  console.log('listening on port: 8080');
})



