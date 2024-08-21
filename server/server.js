// server/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Manejar conexiones de los clientes
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Escuchar eventos de movimiento del carro
    socket.on('move', (data) => {
        // Transmitir movimiento a otros jugadores
        socket.broadcast.emit('move', data);
    });

    // Desconexión
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


socket.on('move', (data) => {
    // Mover el coche del jugador
    playerCar.position.z += data.speed;
    playerCar.rotation.y += data.direction;
});

// Para coches de otros jugadores, habría que gestionar su creación y movimiento de forma similar.
