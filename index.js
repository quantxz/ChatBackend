const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

let messages = [];

app.get("/", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(messages);
});

io.on('connection', (socket) => {
  socket.emit('messages', messages);

  // Enviar mensagens existentes para o cliente
  messages.forEach((message) => {
    socket.emit('message', message);
  });

  socket.on('message', (message) => {
    messages.push(message);

    // Enviar a nova mensagem para todos os clientes conectados
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado.');
  });
});

server.listen(port, () => {
  console.log(`Servidor HTTP e WebSocket iniciados na porta ${port}.`);
});
