import React from "react";
import "./chats.css"
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import pidgeefeather from '../../assets/feather.png';
import { Form, InputGroup, FormControl } from 'react-bootstrap';

const Chats = () =>{
    return(
        <div>
                              <InputGroup className=" d-flex align-items-right">
                        <FormControl
                            type="text"
                            name="searchTerm"
                            placeholder="Search for chats..."
                            className="mr-sm-2"
                        />
                    </InputGroup>
                    <br>
                        </br>
                        <br>
                        </br>
        <Button
          variant="light"
          className="d-inline-flex align-items-center"
        >
          <Image
            src={pidgeefeather}
            roundedCircle
          />
          <span className="ms-1">Pidgee Messaging Service</span>
        </Button>
        </div>
    )}

export default Chats