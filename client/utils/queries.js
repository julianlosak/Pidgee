import { gql } from '@apollo/client';

export const LOAD_USERS=gql`
query users{
  users {
    username
  }
}`

export const USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      message {
        _id
        content
        createdAt
      }
    }
  }
`;

export const QUERY_USERNAME = gql `
 query getUser($username: String!) {
  getUser(username: $username) {
    _id
    username
  }
}
`

export const CHATS = gql `
query getAllChats {
  getAllChats {
    _id
    chatName
    groupChat
    createdAt
    updatedAt
    users {
      _id
    }
    recentMessage {
      content
      createdAt
      sender {
        username
      }
    }
    groupAdmin{
      _id
    }
  }
}

  `;
 
 export const ONE_CHAT = gql `
 query getChat ($chatId: ID!) {
  getChat(chatId: $chatId) {
    chatName
    groupChat
    recentMessage {
      content
      createdAt
      sender {
        username
      }
    }
    users {
      username
    }
  }
}
`;

export const CHATID = gql ` 
  query chatId {
  getCurrentChatId
}
`;

export const CHAT = gql `
query ChatMessages($chatId: ID!) {
    chatMessages(chatId: $chatId) {
    sender {
      username
    }
    content
    createdAt
    updatedAt
  }
}
`;

export const RECENT_MESSAGES = gql `
query recentMessages($chatId: ID!, $limit: Int!) {
  recentMessage(chatId: $chatId, limit: $limit) {
    sender {
      username
    }
    content
    createdAt
    updatedAt
  }
}
`;

export const USER_MESSAGES = gql`
query UserMessages($userId: ID!) {
  userMessages(userId: $userId) {
    sender {
      username
    }
    content
    createdAt
    updatedAt
    chat {
      chatName
      groupChat
      users {
        username
      }
    }
  }
}

`;