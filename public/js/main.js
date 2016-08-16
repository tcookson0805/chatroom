$(document).ready(function(){
  
  //  create a Manager object by calling the io function, which will automatically
  //  attempt to connect to the server and allow you to send and receive messages
  var socket = io();
  
  
////////////////////// VARIABLES //////////////////////

  
  //  sign in Variables
  var entry = $('.entry');
  var signIn = $('.sign-in');
  var userName;
  
  // messenger variables
  var messageForm;
  var messages_left; 
  var messages_right; 
  var messageInput;
  var userList;
  var usersOnline;
  var message;
  
  
////////////////////// FUNCTIONS //////////////////////
  
  // sets the messager variables
  var setFormVar = function(){
    messageForm = $('.message-form');
    messages_left = $('#messages_left'); 
    messages_right = $('#messages_right');
    messageInput = $('.message-input');
    userList = $('.left-panel-main');
    usersOnline = $('.users_online');
    return;
  }
  
    
  // fn that appends a new <div> to the messages
  var addMessage = function(username, message){
    if(username === userName){
      messages_right.append('<div class="message-right"><span class="message-bubble"><span class="message-username">' + username + '</span>' + ': ' + message + '</span></div>');
    }else{
      messages_left.append('<div class="message"><span class="message-bubble"><span class="message-username">' + username + '</span>' + ': ' + message + '</span></div>');
    }
  }
  
  var addUser = function(username){
    userList.append('<div class="user">' + userName + '</div>');
  }
  

////////////////////// JQUERY EVENT LISTENERS //////////////////////

  
  $('body').on('submit', signIn, function(event){
    // grabbing userName
    userName = $('.sign-in_input').val();
    // removing sign-in form from hero section
    signIn.remove();
    // cloning messenger template and placing in hero section
    var messageApp = $('.messenger').clone().appendTo('.hero');
    // removing template section
    $('.template').remove();
    //  sets messenger variables
    setFormVar();
    // // add user
    // addUser(userName);
    
    // emitting userName
    socket.emit('userName', userName);
    // preventing page refresh
    event.preventDefault();
  });
  
  
  //  add keydown listener to the input, which calls the addMessage fn w/ the contents
  //  of the input when the enter button is pressed, then clears the input
  $('body').on('keydown', messageInput, function(event){
  
    if(event.keyCode != 13){
      
      var isTyping = userName + ' is typing....'
      
      
      
      return;
    }
    
    message = messageInput.val();
    //  invoke addMessage function on value of message input
    addMessage(userName, message);
    // socket.emit sends a message to the Socket.IO server
      // first argument is the name for message, in this case is message
      // second argument is data being attached to message, in the case the contents of text box
    socket.emit('message', {user: userName, text: message});
    //  reset messageInput value to zero
    messageInput.val('');  
  });
  

    


////////////////////// SOCKET LISTENERS //////////////////////

  socket.on('disconnect', function(){
    
  })


  
  socket.on('usersOnline', function(data){
    usersOnline.html(data);
  })
  
  
  
  // listener for the socket.broadcast.emit event so that when server sends message with name
    // 'message', the attached data is added to the messages div using the addMessage function
  socket.on('message', function(data){
    return addMessage(data.user, data.text);
  })
  
  // socket.on('userName', addUser);
  
  socket.on('userList', function(data){
    userList.html('');
    for(var key in data){
      if(key === userName){
        $('.header-username').html(key)
        // userList.append('<div class="user current">' + key + '</div>')
      }else{
        userList.append('<div class="user">' + key + '</div>');
      }
    }
  });
});