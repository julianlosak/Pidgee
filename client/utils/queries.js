import { gql } from '@apollo/client';

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

export const USERID = gql `
 query getUserByUsername($username: String!) {
  user(username: $username) {
    _id
    username
  }
}
`

export const CHATS = gql `
query getAllChats {
  chat {
    chatName
    groupChat
    content
    createdAt
    updatedAt
    }
    users {
      username
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