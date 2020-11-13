

class Sockets {
  constructor(io) {
      this.io = io;
      this.socketEvents();
  }

  socketEvents() {
    // Un dispositivo que se conecto a mi socket server / on connection
    this.io.on('connection', (socket) => {
      // @socket: cliente que se conecto

      // Escuchar un Evento: mensaje-to-server
      socket.on('mensaje-to-server', (data) => {
        console.log('El cliente emitió:: ', data);

        // Mensaje global a todas las personas conectadas a este nameSpace
        this.io.emit('mensaje-from-server', data);
      });
    });
  }
}

module.exports = Sockets;
