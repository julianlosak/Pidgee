import React, { useEffect, useState } from "react";
import Chats from "./chats";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from '../../../utils/queries';

const ChatList = ({ selectedUsername }) => {
  const { loading, error, data } = useQuery(LOAD_USERS);
  const [username, setUsername] = useState([]);

  useEffect(() => {
    if (data && data.users) {
      setUsername(data.users);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter the list of users based on the selected username
  const filteredUsers = selectedUsername
    ? username.filter((user) => user.username === selectedUsername)
    : [];

  return (
    <div>
      {filteredUsers.map((val) => (
        <Chats key={val.username} username={val.username} />
      ))}
    </div>
  );
};

export default ChatList;
