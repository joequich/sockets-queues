var socket = io();

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('We lost connection with the server');
});

socket.on('currentStatus', function(data) {
    label.textContent = data.current;
});

var buttons = document.querySelectorAll('button');
var label = document.querySelector('#lblNewTicket');

buttons.forEach( function(button) {

    button.addEventListener('click', function() {
        socket.emit('nextTicket', null, function(next) {
            label.textContent = next;
        });

        
    });

});