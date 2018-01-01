'use strict'

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.set('port', process.env.PORT || 3000);

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

server.listen(app.get('port'), function () {
    console.log('Server is running...');
});