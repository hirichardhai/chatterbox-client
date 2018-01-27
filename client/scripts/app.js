// YOUR CODE HERE:
var app = {
  init: function() {},
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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
      // This is the url you should use to communicate with the parse API server.
      type: 'GET',
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
    // $.get();
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    
    var username = message.username;
    var text = message.text;
    var roomname = message.roomname;

    $('#chats').append('<div>' + '<button href="#" class=' + JSON.stringify(username) + '>' + username + '</button>' + ': ' + text + '</div>');
    // if ($('#chats').find()
    $('".' + JSON.stringify(username) + '"').click(function() {
      app.handleUsernameClick(username);
    });
  },
  renderRoom: function(roomName) {
    $('#roomSelect').append('<div>' + roomName + '</div>');
  },
  handleUsernameClick: function(username) {
    // document.getElementById("username").addEventListener("click", console.log('hi'));
    $('#main').append('<div>' + username + '</div>');
  }
};

