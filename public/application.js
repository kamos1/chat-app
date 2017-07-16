$(() => {
  const socket = io();
  $('form').submit(() => {
    const username = $('.username').val();
    const message = $('#m').val();
    
    socket.emit('chat message', `${username}: ${message}`);
    $('#m').val('');
    return false;
  });

  $('.message').keydown(() => {
    const username = $('.username').val();
    socket.emit('typing', `${username} is typing`)
  })

  $('.message').keyup(() => {
    const username = $('.username').val();
    socket.emit('not typing', '');
  })

  socket.on('chat message', (msg) => {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('new user', (msg) => {
    $('#messages').append($('<li>').text(msg));
  })

  socket.on('user left', (msg) => {
    $('#messages').append($('<li>').text(msg));
  })

  socket.on('typing', (msg) => {
    $('#typing').text(msg);
  })

  socket.on('not typing', (msg) => {
    $('#typing').text(msg);
  })
});