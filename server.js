const gritty = require('gritty');

// Configure Gritty to start a web server and handle all terminal functionality.
// By default, it will handle terminal connections and serve static files.
gritty({
  port: 3000,
  command: 'bash', // You can set this to any command you want to run.
  autoRestart: true,
});

console.log('Gritty server running on port 3000.');