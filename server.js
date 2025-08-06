const http = require('node:http');
const gritty = require('gritty');
const express = require('express');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);
const socket = io.listen(server);
const port = 1337;

app.use(gritty());
app.use(express.static(__dirname));
gritty.listen(socket, {
  command: 'mc', // Replace with your desired command
  autoRestart: true,
});

server.listen(port, () => {
  console.log(`Gritty server listening on port ${port}`);
});