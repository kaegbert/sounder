// call express
var express = require('express');
//create instence
var app = express();
//create server
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
//set local port
server.listen(3000);

//http://localhost:3000/

var boxes = [];

//callback function
io.on('connection', function(socket){
	socket.emit('initialize', boxes);
	console.log("Someone connected!");
	socket.on('box-clicked', function(data){
		boxes.push(data);
		socket.broadcast.emit('box-clicked', data);
		console.log(data);
	});
});

//alternative:
// io.on('connection', connectionFunction);
//  function connectionFunction(socket){
// 	console.log("Someone connected!")
// };

