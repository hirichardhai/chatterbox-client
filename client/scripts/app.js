// YOUR CODE HERE:
var app = {
  //init is for running any code when we load our html
    //we load init with <body onload='app.init()'>
  init: function() {
    app.fetch();
    setTimeout(function() {
      app.fetch();
    }, 333);
  },
  // using jQuery, we execute ajax to send objects as strings to 
    // the app.server.  this is usually called a POST
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
  // app.fetch is a method that retrieves a JSSON string from the app.server.
  // in order to see the order of the data, we can use createdAt or -createdAt for chronological order differences
  // success runs any fucntions with the data JSON we "GET". 
  // took the data's roomnames and appended the rooms to our #rooms HTML
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: 'order=-createdAt',
      contentType: '',
      success: function (data) {
        console.log('chatterbox: Data loaded');
        var allRooms = app.sortRooms(data.results);
        var roomsInArray = Object.keys(allRooms);


        app.clearMessages();
        app.renderMessage(data.results);
        console.log('allRooms', allRooms);
        $('#rooms').empty();
        for (var key in allRooms) {
          $('#rooms').append('<option value=' + key + '">' + key + "</option>")
        }
        
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
  // was a callback function used in fetch to display all messages using jQuery
  // to append to our #chats as well as usernames to .username
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
  // not functional
  renderRoom: function(roomName) {
    $('#roomSelect').append('<div>' + roomName + '</div>');
    
  },
  // our attempt to create a database for our rooms using a object. the key is the roomname and the value are all messages with the same room name.
  // have not implemented change. object also not properly storing objects with no roomname
  sortRooms: function(array) {
    var roomList = {};
    for (var i = 0; i < array.length; i++) {
      var roomTopic = array[i].roomname;
      // setting default roomname for each message object
      if (!roomTopic) {
        array[i]['roomname'] = 'theLounge';
      }
      // Filling out roomList object
      if (roomList[roomTopic] === undefined) {
        roomList[roomTopic] = [array[i]];
      }
      if (roomList[roomTopic] !== undefined) {
        roomList[roomTopic].push(array[i]);
      } 
    }
    return roomList;
  },
  // beginnings of making a friendslist. supposed to detect if a name is clicked.
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

// document.ready waits for all html/ javascript to run first,
  // then it executes any functions inside
// we used jQuery to select the submitbutton and added an event listener
  // that would select the userMessage with .val() in the text box
// and then we send a obj with username/ text to the server.
  // we also get the new data to display

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
  $('#rooms').change('select', function() {
    // app.clearMessages($('.chat').not(****));
  });

});
// var refInterval = setInterval(app.refreshMessages(), 2000);

// var friendsList = [];
