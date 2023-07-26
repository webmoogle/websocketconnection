const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server,{
    cors: {
        origin: "*"
    }
});
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});
const port = 3000;
const hostname = '127.0.0.1';
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});