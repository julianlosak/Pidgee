const zmq = require('zeromq');
const http = require('http');
const io = require('socket.io');

const publisher = zmq.socket('pub');
publisher.bindSync('tcp://127.0.0.1:5556');

// Function to send messages to subscribers
function sendChatMessage(topic, message) {
  publisher.send([topic, message]);
}

const server = http.createServer();
const socketServer = io(server);

socketServer.on('connection', (socket) => {
  console.log('a user connected');

  // Send messages to specific topic via ZeroMQ
  socket.on('sendMessage', ({ topic, message }) => {
    sendChatMessage(topic, message);
  });
});

server.listen(3000, () => {
  console.log('Socket.io server listening on port 3000');
});
