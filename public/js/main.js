$(document).ready(function(){
  
  //  create a Manager object by calling the io function, which will automatically
  //  attempt to connect to the server and allow you to send and receive messages
  var socket = io();
  
  //  sign in Variables
  var entry = $('.entry');
  var signIn = $('.sign-in');

  
  // messenger variables
  var messageForm;
  var messages;  
  var messageInput;
  
  // sets the messager variables
  var setFormVar = function(){
    messageForm = $('.message-form');
    messages = $('#messages');   
    messageInput = $('.message-input');
    return;
  }
  
  
  $('body').on('submit', signIn, function(event){
    
    // grabbing userName
    var userName = $('.sign-in_input').val();
    
    console.log('userName', userName)
    
    // removing sign-in form from hero section
    signIn.remove();
    
    // cloning messenger template and placing in hero section
    var messageApp = $('.messenger').clone().appendTo('.hero');
    
    // removing template section
    $('.template').remove();
    
    //  sets messenger variables
    setFormVar();
    
    // preventing page refresh
    event.preventDefault();
  });
  
  
  //  fn that appends a new <div> to the messages
  var addMessage = function(message){
    messages.append('<div>' + message + '</div>');
  }
  
  //  add keydown listener to the input, which calls the addMessage fn w/ the contents
  //  of the input when the enter button is pressed, then clears the input
  
  
  $('body').on('keydown', messageInput, function(event){
  
    if(event.keyCode != 13){
      return;
    }
    
    var message = messageInput.val();
    
    //  invoke addMessage function on value of message input
    addMessage(message);
    
    // socket.emit sends a message to the Socket.IO server
      // first argument is the name for message, in this case is message
      // second argument is data being attached to message, in the case the contents of text box
    socket.emit('message', message);
    
    //  reset messageInput value to zero
    messageInput.val('');  
  });
  

    
  
  
  
  // listener for the socket.broadcast.emit event so that when server sends message with name
    // 'message', the attached data is added to the messages div using the addMessage function
  socket.on('message', addMessage)
});