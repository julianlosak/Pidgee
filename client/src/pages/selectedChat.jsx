import Header from './../components/header/header';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ADD_MESSAGE, DELETE_MESSAGE } from "../../utils/mutations"

function SelectedChat() {
  const [messages, setMessages] = useState([
    { text: 'Hello', sender: 'other' },
    { text: 'Hi there!', sender: 'you' },
    { text: 'How are you?', sender: 'other' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [addMessage] = useMutation(ADD_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  // const currentChatId = ;
  // const sendMessage = () => {
  //   if (newMessage.trim() !== '') {
  //     setMessages([...messages, { text: newMessage, sender: 'you' }]);
  //     setNewMessage('');
  //   }
  // };
const sendMessage = async () => {
  if(newMessage.trim() !== '') {
    try {
      const { data } = await addMessage({
        variables: {
          content: newMessage,
          chatId: currentChatId
        }
      });
    } catch (error) {
      console.error("error sending the message:", error);
    }
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
