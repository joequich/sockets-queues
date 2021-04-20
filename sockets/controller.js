const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    // when a customer connects
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('current-status', ticketControl.last4);
    socket.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);

        // ALL: notify new ticket
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
    });

    socket.on('attend-ticket', ({desktop}, callback) => {
        if(!desktop) {
            return callback({
                ok: false,
                msg: 'Desktop is required'
            });
        }
        
        const ticket = ticketControl.attendTicket(desktop);
        // ALL: notify change in last4
        socket.broadcast.emit('current-status', ticketControl.last4);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        if(!ticket) {
            return callback({
                ok: false,
                msg: 'There are no more tickets'
            });
        }else {
            return callback({
                ok: true,
                msg: 'Done',
                ticket
            });
        }
    });
};

module.exports = {
    socketController
}