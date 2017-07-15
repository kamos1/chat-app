const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

app.get('/', (request, resposne) => {
  resposne.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit(`chat message`, msg)
    console.log(`message: ${msg}`)
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});