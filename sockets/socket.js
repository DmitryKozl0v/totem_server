const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Periphery'));
bands.addBand(new Band('Tesseract'));
bands.addBand(new Band('Polyphia'));
bands.addBand(new Band('CHON'));
bands.addBand(new Band('Sleep Token'));


// Sockets messages
io.on('connection', client => {
    console.log('Client logged in');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Client logged out')
    });

    client.on('message', (payload) => { 

        console.log('Payload: ', payload)
        io.emit('message', {admin: 'New message!'})
    });

    client.on('new-message', (payload) => { 

        io.emit('new-message', payload); // emits to every client
        client.broadcast.emit('new-message', payload); // emits to every client except the one emiting
    });

    client.on('message-from-client', (payload) =>{
        
        console.log('New message:');
        console.log('From: ' + payload['name']);
        console.log('Message: ' + payload['message']);
        console.log('.===========================.');
        io.emit('message-from-client', payload);
    });

    client.on('submit-vote', (payload) => {

        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    client.on('add-band', (payload) => {

        const newBand = new Band(payload['name'])
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());

    });

    client.on('delete-band', (payload) => {

        bands.deleteBand(payload['id']);
        io.emit('active-bands', bands.getBands());

    });

});