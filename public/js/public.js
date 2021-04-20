var socket = io();

var lablTicket1 = document.querySelector('#lblTicket1');
var lablTicket2 = document.querySelector('#lblTicket2');
var lablTicket3 = document.querySelector('#lblTicket3');
var lablTicket4 = document.querySelector('#lblTicket4');

var lblDesktop1 = document.querySelector('#lblDesktop1');
var lblDesktop2 = document.querySelector('#lblDesktop2');
var lblDesktop3 = document.querySelector('#lblDesktop3');
var lblDesktop4 = document.querySelector('#lblDesktop4');

var lblTickets = [lablTicket1,lablTicket2,lablTicket3,lablTicket4];
var lblDesktops = [lblDesktop1,lblDesktop2,lblDesktop3,lblDesktop4];

var audio = document.querySelector('#audio');

unmuteButton.addEventListener('click', function() {
    if(audio.muted) {
        audio.muted = false;
        unmuteButton.textContent = 'Deshabilitar sonido';
    } else {
        audio.muted = true;
        unmuteButton.textContent = 'Habilitar sonido';
    }
});

socket.on('currentStatus', function(data) {
    updateHTML(data.last4);
});

socket.on('last4', function(data) {
    var promise = audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
            console.log('Autoplay started!');
        }).catch(error => {
            console.log('Autoplay was prevented.');
        });
    }
    updateHTML(data.last4);
});

function updateHTML(last4) {
    for (var i = 0; i <= last4.length-1; i++) {
        lblTickets[i].textContent = 'Ticket ' +last4[i].number;
        lblDesktops[i].textContent = 'Desktop ' +last4[i].desktop;
    }
}