const express = require('express');
const path = require('path');
require('dotenv').config();

// Express app
const app = express();
const router = express.Router();

// Node server
const server = require('http').createServer(app);



// Public path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// hola 

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Server running on port', 3000);

}); 

app.get('/hola', function (req, res) {
    res.status(201).send("hola");
});