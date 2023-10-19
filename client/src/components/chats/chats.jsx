import React from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import pidgeefeather from '../../assets/feather.png';

const Chats = (props) => {
  const { username } = props;

  return (
    <div>
      <Button
        variant="light"
        className="d-inline-flex align-items-center"
      >
        <Image
          src={pidgeefeather}
          roundedCircle
        />
        <span className="ms-1" onClick={() => window.location = "/chat"}>{username}</span>
      </Button>
    </div>
  );
};

export default Chats;
