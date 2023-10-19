import React from "react";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Auth from '../../../utils/auth';
import "./header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import pidgeeLogo from '../../assets/Pidgee-Logo.png';
import searchIcon from '../../assets/search.png';
import { useLazyQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_CONTACT } from "../../../utils/mutations";
import { Form, InputGroup, FormControl, Button, ListGroup, ModalHeader } from 'react-bootstrap';
import { QUERY_USERNAME } from "../../../utils/queries";
import { CREATE_CHAT } from "../../../utils/mutations";
import ChatList from '../chats/chatsList'

const Header = () => {
  const [addContact] = useMutation(ADD_CONTACT);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location = "/";
  }

  const [username, setSearchUsername] = useState('');
  const [getUser, { loading, data }] = useLazyQuery(QUERY_USERNAME);
  const [contacts, setContacts] = useState([]);
  const [createChat] = useMutation(CREATE_CHAT);
  const [chatName, setChatName] = useState('');
  const [groupChat, setGroupChat] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);

  const openChatModal = () => {
    setShowChatModal(true);
  };

  const closeChatModal = () => {
    setShowChatModal(false);
  }

  useEffect(() => {
    if (data && data.user) {
      setContacts([data.user]);
      console.log(data);
    }
  }, [data]);

  const handleSearchUser = async () => {
    if (username.trim() !== '') {
      console.log('Searching for user:', username);

      // Set the selected username in the state
      setSelectedUsername(username);

      // Reset the search input field
      setSearchUsername('');
    }
  };

  const handleAddContacts = async (userId) => {
    try {
      const { data } = await addContact({
        variables: { userId },
      });
      console.log(`Contact added successfully: ${data.addContact._id}`);
    } catch (error) {
      console.error("Error adding contacts:", error);
    }
  }

  const handleCreateChat = async () => {
    if (chatName.trim() !== '')
      try {
        console.log("chatName:", chatName);

        const { data } = await createChat({
          variables: {
            chatName: chatName,
          }
        });

        console.log(`Chat created successfully: ${data.createChat.chatName}`);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
  };

  return (
    <div>
      <Navbar expand="lg" className="rounded custom-color">
        <Container>
          <img src={pidgeeLogo} alt="" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#favorites">Favorites</Nav.Link>

              {Auth.loggedIn() ? (
                <>
                  <span>Start chatting, {Auth.getUser().data.username}!</span>
                  <button className="btn btn-md btn-light m-2" onClick={logout}>
                    Logout
                  </button>
                  <button className="btn btn-md btn-light m-2" onClick={openChatModal}>
                    Create Chat
                  </button>
                  <Modal show={showChatModal} onHide={closeChatModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Create a Chat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <InputGroup className="mb-3">
                          <FormControl
                            type="text"
                            placeholder="Chat Name"
                            value={chatName}
                            onChange={(e) => setChatName(e.target.value)}
                          />
                        </InputGroup>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={closeChatModal}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleCreateChat}>
                        Create Chat
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              ) : (
                <>
                  <Nav.Link className="" href="/login">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Container>
          <InputGroup className="search-icon d-flex align-items-right">
            <FormControl
              type="text"
              name="searchTerm"
              placeholder="Search for chats..."
              className="mr-sm-2"
            />
            <Button type="submit" className=" btn-light">
              <img src={searchIcon} alt="" />
            </Button>
          </InputGroup>
        </Container>
        <Container>
          <InputGroup className="search-icon d-flex align-items-right">
            <FormControl
              type="text"
              name="searchTerm"
              placeholder="Search for user"
              value={username}
              onChange={(e) => setSearchUsername(e.target.value)}
            />
            <Button type="button" className="btn-light" onClick={handleSearchUser}>
              <img src={searchIcon} alt="" />
            </Button>
          </InputGroup>
        </Container>
      </Navbar>
      <ChatList selectedUsername={selectedUsername} />

      {loading && <p>Loading...</p>}
      {data && data.user && (
        <div>
          <h3>User Info:</h3>
          <p>Username: {data.user.username}</p>
          <Button className="btn btn-sm btn-light float-end"
            onClick={() => handleAddContacts(data.user._id)}>Add</Button>
        </div>
      )}
    </div>
  )
}

export default Header;
