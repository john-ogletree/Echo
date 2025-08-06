// src/pages/api/terminal.js
import pty from 'node-pty';
import { WebSocketServer } from 'ws';

// This is the WebSocket server that will run inside Astro.
// It is separate from the main HTTP server.
export const get = ({ request }) => {
  if (request.headers.get('upgrade') !== 'websocket') {
    return new Response(null, { status: 400 });
  }

  const { websocket, response } = new Response(null, {
    status: 101,
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
    },
  });

  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', ws => {
    const shell = pty.spawn('bash', [], {
      name: 'xterm-256color',
      cols: 80,
      rows: 30,
    });

    shell.onData(data => {
      ws.send(data);
    });

    ws.on('message', message => {
      shell.write(message.toString());
    });

    ws.on('close', () => {
      shell.kill();
    });
  });

  return { websocket, response };
};