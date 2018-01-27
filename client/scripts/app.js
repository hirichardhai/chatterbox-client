// YOUR CODE HERE:
var app = {
  init: function() {
    app.fetch();
    setTimeout(function() {
      app.fetch();
    }, 333);
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
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
      data: 'order=-createdAt',
      contentType: '',
      success: function (data) {
        console.log('chatterbox: Data loaded');
        console.log(data);
        app.clearMessages();
        app.renderMessage(data.results);
        var allRooms = app.sortRooms(data.results);
        console.log('allRooms', allRooms);
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

      $('#chats').append('<div>' + '<button href="#" class=username>' + username + '</button>' + ': ' + _.escape(JSON.stringify(text)) + '</div>');
      $('.username').click(function() {
        app.handleUsernameClick(username);
      });
    }
  },
  renderRoom: function(roomName) {
    $('#roomSelect').append('<div>' + roomName + '</div>');
    
  },
  sortRooms: function(array) {
    var roomList = {};
    for (var i = 0; i < array.length; i++) {
      var roomTopic = array[i].roomname;
      if (!roomTopic) {
        array[i]['theLounge'] = 'theLounge';
      }
      if (roomList[roomTopic] === undefined) {
        roomList[roomTopic] = [array[i]];
      }
      if (array[i].roomname !== undefined) {
        roomList[roomTopic].push(array[i]);
      } 
    }
    return roomList;
  },
  handleUsernameClick: function(username) {
    // document.getElementById("username").addEventListener("click", console.log('hi'));
    $('#main').append('<div>' + username + '</div>');
  }
  // refreshMessages: function() {
  //   app.clearMessages();
  //   app.fetch();
  //   app.renderMessage();
    
  // }
  // sendMessage: function() {
  //   $('#submitButton').on('click', function() {
  //     console.log('hey');
  //   });
  // }
};

$(document).ready(function() {

  $('#submitButton').on('click', function() {
    var obj = {};
    var userMessage = $('#messageBox').val(); 
    obj.text = userMessage;
    obj.username = window.location.search.slice(10);
    app.send(obj);
    app.fetch();
  });

  $('#clearMessages').on('click', function() {
    app.clearMessages();
  });

});
// var refInterval = setInterval(app.refreshMessages(), 2000);

// var friendsList = [];
