$(() => {
  const socket = io();
  $('form').submit(() => {
    const username = $('.username').val();
    const message = $('#m').val();
    
    socket.emit('chat message', `${username}: ${message}`);
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