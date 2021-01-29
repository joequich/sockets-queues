var socket = io();

// on - listen information
socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('We lost connection with the server');
});

// emit - send information
socket.emit('sendMessage',{
    user: 'Joseph',
    message: 'Hello there'
}, function(resp) {
    console.log('Response server ', resp);
});

// on - listen information
socket.on('sendMessage', function(message) {
    console.log(message);
});