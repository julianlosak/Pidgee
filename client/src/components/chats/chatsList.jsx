import React, { useEffect, useState } from "react";
import Chats from "./chats";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from '../../../utils/queries';

const ChatList = () => {
  const { loading, error, data } = useQuery(LOAD_USERS);
  const [username, setUsername] = useState([]); // Initialize username as an empty array
  const [selectedUsername, setSelectedUsername] = useState(null);

  useEffect(() => {
    // Check if data exists and if data.users is an array before setting username
    if (data && data.users) {
      setUsername(data.users);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {username.map((val) => (
        <Chats key={val.username} username={val.username} /> // Pass username as a prop
      ))}
    </div>
  );
};

export default ChatList;
