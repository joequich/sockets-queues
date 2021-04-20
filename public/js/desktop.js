const socket = io();
const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')){
    window.location = 'index.html';
    throw new Error('Desktop is require');
}

const desktop = searchParams.get('desktop');
const btnAttdTicket = document.querySelector('#attdTicket');
const lblDesktop = document.querySelector('h1');
const lblNroTicket = document.querySelector('#nroTicket');
const lblPending = document.querySelector('#lblPending');
const divAlert = document.querySelector('.alert');

lblDesktop.textContent = 'Desktop ' + desktop;
divAlert.style.display = 'none';

socket.on('connect', () => {
    btnAttdTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnAttdTicket.disabled = true;
});

socket.on('pending-tickets', (pending) => {
    if(pending === 0) {
        lblPending.style.display = 'none';
    } else {
        lblPending.style.display = '';
        lblPending.textContent = pending;
    }
});

btnAttdTicket.addEventListener('click', function() {
    socket.emit('attend-ticket', { desktop }, ({ok, msg, ticket}) => {
        if(!ok) {
            lblNroTicket.textContent = 'nobody';
            divAlert.textContent = msg;
            return divAlert.style.display = '';
        }

        lblNroTicket.textContent = `Ticket ${ticket.number}`;
    });
});

