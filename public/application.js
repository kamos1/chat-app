$(() => {
  const socket = io();
  $('form').submit(() => {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', (msg) => {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('new user', (msg) => {
    $('#messages').append($('<li>').text(msg));
  })

  socket.on('user left', (msg) => {
    $('#messages').append($('<li>').text(msg));
  })
});