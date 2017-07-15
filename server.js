const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

// app.get('/', (request, resposne) => {
//   resposne.sendFile(__dirname + '/public');
// });

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
  io.emit('new user', 'new user connected')

  socket.on('disconnect', () => {
    console.log('user left')
    io.emit('user left', 'a user left')
  })

  socket.on('chat message', (msg) => {
    socket.broadcast.emit(`chat message`, msg)
    console.log(`message: ${msg}`)
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});