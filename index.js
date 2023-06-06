const http = require('http');
const serverr = http.createServer();

// Importe o servidor WebSocket
const server = require('./server');
const port = process.env.PORT || 3000

serverr.on('upgrade', (request, socket, head) => {
  server.handleUpgrade(request, socket, head, (ws) => {
    server.emit('connection', ws, request);
  });
});

serverr.listen(port, () => {
  return 'Servidor HTTP e WebSocket iniciados na porta 3000.';
});