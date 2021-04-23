const {io} = require('../index');

// Sockets messages
io.on('connection', client => {
    console.log('Client logged in');

    client.on('disconnect', () => { 

        console.log('Client logged out')
    });

    client.on('message', (payload) => { 

        console.log('Payload: ', payload)
        io.emit('message', {admin: 'New message!'})
    });

});