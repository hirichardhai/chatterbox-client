// YOUR CODE HERE:
var app = {
  init: function() {
    app.fetch();
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: '',
      contentType: '',
      success: function (data) {
        console.log('chatterbox: Message sent');
        console.log(data);
        app.renderMessage(data.results);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
    // $.get('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages', alert('success'));
  },
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    
    for (var i = 0; i < message.length; i++) {
      var username = message[i].username;
      var text = message[i].text;
      var roomname = message[i].roomname;

      $('#chats').append('<div>' + '<button href="#" class=username>' + username + '</button>' + ': ' + text + '</div>');
      $('.username').click(function() {
        app.handleUsernameClick(username);
      });
    }
  },
  renderRoom: function(roomName) {
    $('#roomSelect').append('<div>' + roomName + '</div>');
    
  },
  handleUsernameClick: function(username) {
    // document.getElementById("username").addEventListener("click", console.log('hi'));
    $('#main').append('<div>' + username + '</div>');
  }
};
