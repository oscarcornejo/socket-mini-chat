// Servidor de Express
const express = require('express');

// Servidor de Sockets
const http = require('http');

// socket.io
const socketio = require('socket.io');

// Path
const path = require('path');

// Sockets
const Sockets = require('./sockets');

class Server {
  constructor() {

    // Configuraciones Globales
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuración del socket server
    this.io = socketio(this.server, {
      // Configuraciones
    });
  }

  middlewares() {
    //   Desplegar el directorio /public
      this.app.use(express.static( path.resolve(__dirname, '../public') ));
  }

  configurarSockets(){
    //
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar el Server
    this.server.listen(this.port, () => {
      console.log('Server Ok!', this.port);
    });
  }
}

module.exports = Server;
