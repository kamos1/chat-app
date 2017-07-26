const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000)


let numUsers = 0;

io.on('connection', (socket) => {
  numUsers++;

  io.emit('new user', `A user connected there are now ${numUsers} connected`);

  socket.on('disconnect', () => {
    numUsers--
    io.emit('user left', `A user disconnected there are now ${numUsers} connected`);
  })

  socket.on('chat message', (msg) => {
    io.emit(`chat message`, msg);
  });

  socket.on('typing', (msg) => {
    socket.broadcast.emit('typing', msg);
  })

  socket.on('not typing', (msg) => {
    socket.broadcast.emit('not typing', msg);
  })
});

http.listen(app.get('port'), () => {
  console.log('listening on *:3000');
});