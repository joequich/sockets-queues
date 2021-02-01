const {io} = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.next();
        console.log(next);
        callback(next);
    });

    client.emit('currentStatus', { 
        current: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    });

    

    client.on('attendTicket', (data, callback) => {
        if(!data.desktop) {
            return callback({
                err: true,
                message: 'Desktop is require'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desktop);

        callback(attendTicket);
        
        client.broadcast.emit('last4', { 
            last4: ticketControl.getLast4()
        });
    });

    ///hhhhh
}); 