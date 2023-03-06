const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  const sessionID = socket.id;
  console.log('User Connected: ' + sessionID);

  socket.on('disconnect', () => {
    console.log(sessionID + ' disconnected');
  });

  socket.on('chat message', (msg) => {
    msg = sessionID + ': ' + msg;
    console.log(msg);
    io.emit('chat message', msg);
  });

});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
