const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

let onlineUsers = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', (username) => {
        onlineUsers[socket.id] = username;
        io.emit('user joined', username);
        io.emit('update users', Object.values(onlineUsers));
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', onlineUsers[socket.id]);
    });

    socket.on('disconnect', () => {
        const username = onlineUsers[socket.id];
        delete onlineUsers[socket.id];
        io.emit('user left', username);
        io.emit('update users', Object.values(onlineUsers));
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
