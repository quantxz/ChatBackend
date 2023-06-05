const WebSocket = require('ws');
const express = require('express');
const app = express();
const path = require('path')

const port = process.env.PORT || 3000

const server = new WebSocket.Server({ port: port });

let messages = [];
let connections = [];

server.on("connection", (ws) => {
    ws.send({messages: messages});
    ws.send({length: connections.length});

    // Enviar mensagens existentes para o cliente
    messages.forEach((message) => {
        ws.send(message);
    });

    ws.on("message", (message) => {
        messages.push(message);
        connections.push(ws);        

        // Enviar a nova mensagem para todos os clientes conectados
        connections.forEach((client) => {
            client.send(message);
        });
    });

    ws.on("close", () => {
        console.log("Cliente desconectado.");
    });
});


module.exports(server)
module.exports(port)
