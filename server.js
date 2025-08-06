// server.js
const http = require('http');
const express = require('express');
const { WebSocketServer } = require('ws');
const pty = require('node-pty');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Serve your built Astro site's static files from the 'dist' directory.
app.use(express.static('dist'));

wss.on('connection', ws => {
  console.log('New WebSocket connection.');

  // Spawn a new shell process for the client.
  const shell = pty.spawn('bash', [], {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
  });

  // Send the shell's output to the client via the WebSocket.
  shell.onData(data => {
    ws.send(data);
  });

  // Receive data from the client and write it to the shell's input.
  ws.on('message', message => {
    shell.write(message.toString());
  });

  // Close the shell when the WebSocket connection is closed.
  ws.on('close', () => {
    shell.kill();
    console.log('WebSocket connection closed.');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});