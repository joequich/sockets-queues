var socket = io();
var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')){
    window.location = 'index.html';
    throw new Error('Desktop is require');
}

var desktop = searchParams.get('desktop');
var button = document.querySelector('#attdTicket');
var label = document.querySelector('#nroTicket');

document.querySelector('h1').textContent = 'Desktop ' +desktop;

button.addEventListener('click', function() {
    socket.emit('attendTicket', { desktop: desktop }, function(data) {
        if(data === 'There are no tickets') {
            alert(data);
            return;
        }

        label.textContent = 'Ticket ' +data.number;
    });
});

