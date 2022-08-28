#!/usr/bin/env node

/**
 * Module dependencies.
 */

 var app = require('../main');
 var debug = require('debug')('2:server');
 var https = require('https');
 var fs = require('fs')
 
 /**
  * Get port from environment and store in Express.
  */
 
 var port = normalizePort(process.env.PORT || '42000');
 app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 var server = https
 .createServer(
   {
     key: fs.readFileSync("privkey.pem"),
     cert: fs.readFileSync("fullchain.pem"),
   },
   app
 );
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 server.listen(port, function () {
  console.log(
    "Example app listening on port 3000! Go to https://localhost:3000/"
  );
})
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 }
