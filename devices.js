var spawn = require('child_process').spawn;

var devices = [];

function parseScannResponse(data) {
  devices = [];
  var lines = data.split('\n');
  
  for(var i in lines) {
    if(lines[i].match(/\t.*\t.*/)) {
      var line = lines[i].split('\t');
      devices.push({
        name: line[2],
        id: line[1],
        isFavorite: false,
        isConnected: false      
      });
    }
  }
}

function updateDevices() {  
  var child = spawn('hcitool', ['scann']);
  var data = '';
  child.stdout.on('data', function(chunk) {
    data += chunk.toString();
    parseScannResponse(data);
  });

  child.on('close', function() {
    setTimeout(updateDevices, 100);
  });
}

function init(server) {
	server.route({
	    method: 'GET',
	    path: '/devices',
	    handler: function (request, reply) {
		    reply(JSON.stringify(devices));
	    }
	});

  updateDevices();
}


module.exports = {
	init: init
};


