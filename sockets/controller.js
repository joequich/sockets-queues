const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    console.log('Client connected', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });

    socket.on('send-message', (payload, callback) => {
        const id = 1234567;
        callback(id);
        socket.broadcast.emit('send-message', payload);
    });
};

module.exports = {
    socketController
}