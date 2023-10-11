import React from "react";
import "./chats.css"
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import pidgeefeather from '../../assets/feather.png';

const Chats = () =>{
    return(
        <div>
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