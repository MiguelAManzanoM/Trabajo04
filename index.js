//Importando herramientas
var express = require('express');
var socketServer = require('socket.io');

// Setup del chat
var chat = express();
var servidor = chat.listen(4000, function(){
    console.log('Escuchando peticiones en el puerto 4000,');
});

// Archivos estáticos, se utiliza a la carpeta public y sus archivos para el front
chat.use(express.static('public'));

// Setup de la conexión entre los clientes y el servidor
var io = socketServer(servidor);
io.on('connection', function(socketServer){

    console.log('Conexión exitosa con el socket', socketServer.id);

    // Enviar mensaje al chat
    socketServer.on('chat', function(data){
        // Se envía el mensaje a los demás clientes
        io.sockets.emit('chat', data);
    });

    // Mostrar la descripción de 'está escribiendo'
    socketServer.on('typing', function(data){
        socketServer.broadcast.emit('typing', data);
    });
});