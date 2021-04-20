const socket = io();
const btnNew = document.querySelector('button');
const lblNewTicket = document.querySelector('#lblNewTicket');

socket.on('connect', () => {
    btnNew.disabled = false;
});

socket.on('disconnect', () => {
    btnNew.disabled = true;
});

socket.on('last-ticket', (last) => {
    lblNewTicket.textContent = last;
});

btnNew.addEventListener('click', function() {
    socket.emit('next-ticket', null, (next) => {
        lblNewTicket.textContent = next;
    });
});