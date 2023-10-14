import Header from './../components/header/header';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SelectedChat() {
  const [messages, setMessages] = useState([
    { text: 'Hello', sender: 'other' },
    { text: 'Hi there!', sender: 'you' },
    { text: 'How are you?', sender: 'other' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'you' }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="selected-chat">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'you' ? 'sent' : 'received'}`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="message-input">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button variant="primary" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SelectedChat;
