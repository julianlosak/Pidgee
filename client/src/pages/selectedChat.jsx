import Header from './../components/header/header';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ADD_MESSAGE, DELETE_MESSAGE } from "../../utils/mutations";
import { CHATID } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

function SelectedChat() {
  const [messages, setMessages] = useState([
    {user_id: 1, text: 'Hello', sender: 'other' },
    {user_id: 1, text: 'Hi there!', sender: 'you' },
    {user_id: 2, text: 'How are you?', sender: 'other' },
    {user_id: 3, text: 'Hello folks, how are you?', sender: 'other' },
    {user_id: 4, text: 'Howdy?', sender: 'other' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [addMessage] = useMutation(ADD_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const { loading, error, data} = useQuery(CHATID);
  const [contacts, setContact] = useState([{id: 1, name: "Adib" }, {id: 2, name: "Julian"}, {id: 3, name: "Ian"}, {id: 4, name: "Aaron"}])
  const [selectedChat, setSelectedChat] = useState(contacts[0])

  if (loading) return "Loading...";
  if (error) {
    console.error("Error loading chat ID", error);
    return "Error loading chat ID";
  }
  // const sendMessage = () => {
  //   if (newMessage.trim() !== '') {
  //     setMessages([...messages, { text: newMessage, sender: 'you' }]);
  //     setNewMessage('');
  //   }
  // };

  const currentChatId = data.chatId;

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

const selectedChatObj = (obj) => {
  setSelectedChat(obj)
}

  return (
    <div>
      <Header></Header>
      <div className="selected-chat" style={{ paddingTop: 20 }}>
        <div style={{ display: "flex", height: "50vh" }}>
          <div style={{ flex: "2", borderRight: "1px solid" }}>
            <div className="chat-list-sidebar">
              <h2>Chat List</h2>
              <ul className="chat-list">
                {contacts.map((chat) => (
                  <li key={chat.id} className="chat-item" style={{ cursor: "pointer", listStyle: "none", borderBottom: "1px solid" }} onClick={() => selectedChatObj(chat)}>
                    <div className="chat-item-name" style={{ padding: "10px 0px" }}>{chat.name}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ flex: "6", alignSelf: "end" }}>
            <p>Selected: {selectedChat.name}</p>
          <div className="chat-messages">
            {messages.map((message, index) => {
              if (message.user_id == selectedChat.id){
                  return <div
                    key={index}
                    className={`message ${message.sender === 'you' ? 'sent' : 'received'}`}
                  >
                    {message.text}
                  </div>
              }
             })
          }
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
      </div>
    </div>
  );
}

export default SelectedChat;
