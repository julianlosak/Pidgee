import React from "react";
import "./header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import pidgeeLogo from '../../assets/Pidgee-Logo.png';
import Auth from '../../../utils/auth';
import { Link } from 'react-router-dom';
import searchIcon from '../../assets/search.png';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }
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
              <span>Hey there, {Auth.getProfile().data.username}!</span>
              <button className="btn btn-md btn-light m-2" onClick={logout}>
                Logout
              </button>
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
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
