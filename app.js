'use strict'

const server = require('http').createServer(require('express')());
const io = require('socket.io')(server);
const mongoose = require('mongoose');

const playerModel = require('./player');

io.on('connection', function(socket) {
    socket.on('Join', function(data) {
        if (!data) {
            return;
        }
        socket.join(data.roomID);
        socket.to(data.roomID).emit('Joined', data);
        console.log('Joined to room ' + data.roomID);
    });

    socket.on('Move', function(data) {
        if (data) {
            socket.to(data.roomID).emit('Moved', data.roomID);
            console.log('Moved to ' + data.roomID);
        }
    });

    socket.on('Leave', function(data) {
        if (!data) {
            return;
        }
        socket.to(data.roomID).emit('Leaved', data);
        socket.leave(data.roomID);
        console.log('Leaved from ' + data);
    });

    socket.on('disconnect', function() {
        console.log('Disconnected');
    });
});

mongoose.connect('mongodb://localhost/oiraga', function(err) {
    if (err) {
        console.log('Can not connect to DB');
        return;
    }
    console.log('Successfully connected to DB');
});

server.listen(process.env.PORT || 3000, function() {
    console.log('Server is running...');
});
