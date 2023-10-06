const zmq = require('zeromq');

const publisher = zmq.socket('pub');
publisher.bindSync('tcp://127.0.0.1:5556');

// Function to send messages to subscribers
function sendChatMessage(topic, message) {
  publisher.send([topic, message]);
}
// Usage: sendChatMessage('general', 'Hello, World!');

io.on('connection', (socket) => {
    console.log('a user connected');
  
    // Send messages to specific topic via ZeroMQ
    socket.on('sendMessage', ({ topic, message }) => {
      sendChatMessage(topic, message);
    });
  });
  