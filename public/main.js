$(document).ready(function(){
  
  //create a Manager object by calling the io function, which will automatically
  // attempt to connect to the server and allow you to send and receive messages
  var socket = io();
  
  var input = $('input');
  var messages = $('#messages');
  
  var addMessage = function(message){
    messages.append('<div>' + message + '</div>');
  }
  
  input.on('keydown', function(event){
    if(event.keyCode != 13){
      return;
    }
    
    var message = input.val();
    addMessage(message);
    input.val('');  
  });
});