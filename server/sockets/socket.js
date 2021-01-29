const {io} = require('../server')
io.on('connection', (client) => {
    console.log('Connected user');

    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Welcome to the application'
    });
    
    client.on('disconnect', () => {
        console.log('User logged out');
    });

    client.on('sendMessage', (data, callback) => {
        console.log(data);

        client.broadcast.emit('sendMessage', data);
        // if(message.user) {
        //     callback({
        //         resp: 'All is fine'
        //     });
        // } else {
        //     callback({
        //         resp: 'All is WRONG!'
        //     });
        // }
    });
});