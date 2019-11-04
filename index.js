//backend

var express = require('express');
var socket = require('socket.io');
// App setup

var app = express();
var server = app.listen(5000, function(){
  console.log('listening to request on port 5000');
});


//Static file
app.use(express.static('public'));

//socket setup
var io = socket(server);

//activate when server gets a connection from client
io.on('connection', function(socket){
  console.log('made socket connection', socket.id);

//catch the 'chat' action
//server just passed data that one client sent it to server. after that, server passes the data to another clinets
  socket.on('chat', function(data) {
    console.log(data);
    io.sockets.emit('chat', data);
  });


//broadcast method. original client who typed the message cannot get any data from server
  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });

});
