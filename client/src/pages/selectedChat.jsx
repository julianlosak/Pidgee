import Header from './../components/header/header';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ADD_MESSAGE, DELETE_MESSAGE } from "../../utils/mutations";
import { CHATID, CHATS, CHAT } from "../../utils/queries";
import { useLazyQuery, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

function SelectedChat() {
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState('');
  const [addMessage] = useMutation(ADD_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const { loading, error, data} = useQuery(CHATID);
  const { data: allchats} = useQuery(CHATS);
  const [ChatMessages, { data: chatMessages}] = useLazyQuery(CHAT);
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState()

  useEffect(() => {
    if(allchats){
      setChats(allchats.getAllChats)
      setSelectedChat(allchats.getAllChats[0])
    }
  }, [allchats])

  useEffect(() => {
    if(selectedChat){
      getAllMessages()
    }
  }, [selectedChat])

  const getAllMessages = async () => {
    try {
      const {data: chat_msgs} = await ChatMessages({ variables:  { chatId:  selectedChat._id}});
      setMessages(chat_msgs.chatMessages)
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  if (loading) return "Loading...";
  if (error) {
    console.error("Error loading chat ID", error);
    return "Error loading chat ID";
  }

const sendMessage = async () => {
  if(newMessage.trim() !== '') {
    try {
      const { data } = await addMessage({
        variables: {
          content: newMessage,
          chatId: selectedChat._id
        }
      });
      getAllMessages()
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
        <div style={{ display: "flex", height: "70vh" }}>
          <div style={{ flex: "2", borderRight: "1px solid" }}>
            <div className="chat-list-sidebar">
              <h2>Chat List</h2>
              <ul className="chat-list">
                {chats.map((chat) => {
                  if(chat.chatName){
                    return(<li key={chat._id} className="chat-item" style={{ cursor: "pointer", listStyle: "none", borderBottom: "1px solid" }} onClick={() => selectedChatObj(chat)}>
                      <div className="chat-item-name" style={{ padding: "10px 0px" }}>{chat.chatName}</div>
                    </li>)
                  }
                })}
              </ul>
            </div>
          </div>
          <div style={{ flex: "6", alignSelf: "end" }}>
            <p>Selected: {selectedChat?.chatName}</p>
          <div className="chat-messages">
            {messages.map((message, index) => {
              // if (message.user_id == selectedChat?.id){
                  return <div
                    key={index}
                    className={`message ${message.sender === 'you' ? 'sent' : 'received'}`}
                  >
                    {message.content}
                  </div>
              // }
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
