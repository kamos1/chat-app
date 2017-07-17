$(() => {
  const socket = io();
  $('form').submit(() => {
    const username = $('.username-input').val();
    const message = $('#m').val();
    
    socket.emit('chat message', `${username}: ${message}`);
    $('#m').val('');
    $('.username').val('');
    return false;
  });

  $('.message-input').keydown(() => {
    const username = $('.username-input').val();
    socket.emit('typing', `${username} is typing`)
  })

  $('.message-input').keyup(() => {
    const username = $('.username-input').val();
    socket.emit('not typing', '');
  })

  socket.on('chat message', (msg) => {
    $('#messages').append($('<li class="message">').text(msg));
  });

  socket.on('new user', (msg) => {
    $('.user-connection').text(msg);
  })

  socket.on('user left', (msg) => {
    $('.user-connection').text(msg);
  })

  socket.on('typing', (msg) => {
    $('#typing').text(msg);
  })

  socket.on('not typing', (msg) => {
    $('#typing').text(msg);
  })
});