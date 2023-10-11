import React from "react";
import "./header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import pidgeeLogo from '../../assets/Pidgee-Logo.png'
import { Form, FormControl, Button } from 'react-bootstrap';

const Header = () =>{
    return(
        <div>
                <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img src={pidgeeLogo} alt="" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container>
      <Form onSubmit={null} inline>
      <FormControl
        type="text"
        name="searchTerm"
        placeholder="Search..."
        className="mr-sm-2"
      />
       <Button className="search-button"type="submit">Search</Button>
    </Form>
      </Container>
    </Navbar>
        </div>
    )
}
export default Header