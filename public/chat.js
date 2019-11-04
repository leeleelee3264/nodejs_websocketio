var socket = io.connect('http://localhost:5000');

//Query down
var message = document.getElementById('message');
handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

//send message to server
btn.addEventListener('click', function() {

  //client send a message and this action is defined as 'chat'
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
});


//detect a client is typing or not.
message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
})


//do something when server fires action calls chat
socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>'; //이렇게 잘 되면 es6 형태로 바꿔보자
});

socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message....' + '</p></em>';
});
