var Hapi = require('hapi');
var devices = require('./devices');

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

devices.init(server);

