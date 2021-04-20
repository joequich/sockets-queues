const socket = io();

const lablTicket1 = document.querySelector('#lblTicket1');
const lablTicket2 = document.querySelector('#lblTicket2');
const lablTicket3 = document.querySelector('#lblTicket3');
const lablTicket4 = document.querySelector('#lblTicket4');

const lblDesktop1 = document.querySelector('#lblDesktop1');
const lblDesktop2 = document.querySelector('#lblDesktop2');
const lblDesktop3 = document.querySelector('#lblDesktop3');
const lblDesktop4 = document.querySelector('#lblDesktop4');

const lblTickets = [lablTicket1,lablTicket2,lablTicket3,lablTicket4];
const lblDesktops = [lblDesktop1,lblDesktop2,lblDesktop3,lblDesktop4];

const audio = document.querySelector('#audio');

unmuteButton.addEventListener('click', function() {
    if(audio.muted) {
        audio.muted = false;
        unmuteButton.textContent = 'Deshabilitar sonido';
    } else {
        audio.muted = true;
        unmuteButton.textContent = 'Habilitar sonido';
    }
});

socket.on('current-status', (payload) => {
    // const [ ticket1, ticket2, ticket3, ticket4] = payload;
    const promise = audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
            console.log('Autoplay started!');
        }).catch(error => {
            console.log('Autoplay was prevented.');
        });
    }
    updateHTML(payload);
});

function updateHTML(last4) {
    for (let i = 0; i <= last4.length-1; i++) {
        if(last4[i]) {
            lblTickets[i].textContent = `Ticket ${last4[i].number}`;
            lblDesktops[i].textContent = `Desktop ${last4[i].desktop}`;
        }
    }
}