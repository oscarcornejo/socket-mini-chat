// Servidor de Express
const express = require('express');
const app = express();

// Servidor de Sockets
const server = require('http').createServer(app);

// Configuración del socket server
const io = require('socket.io')(server);

//  Desplegare directorio público
app.use(express.static(__dirname + '/public'));

// Un dispositivo que se conecto a mi socket server
io.on('connection', (socket) => {
  // Socket: cliente que se conecto
  console.log('Cliente:', socket.id); // Id único que cambia cada vez que se conecta el cliente
  // emitir un envento
  socket.emit('mensaje-bienvenida', {
    msg: 'Bienvenido!',
    fecha: new Date(),
  });

  // Escuchar un Evento
  socket.on('mensaje-to-server', (data) => {
    console.log('El cliente emitió:: ', data);

    // Mensaje global a todas las personas conectadas a este nameSpace
    io.emit('mensaje-from-server', data);
  });
});
server.listen(5000, () => {
  console.log('Server Ok!');
});
