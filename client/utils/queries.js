import { gql } from '@apollo/client';

export const QUERY_USER = gql`
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

export const QUERY_CHATS = gql `
query getAllChats {
    chatName
    groupChat
    content
    createdAt
    updatedAt
    }
    users {
      username
    }
  `;
 
 export const QUERY_ONE_CHAT = gql `
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

export const QUERY_CHAT = gql `
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

export const QUERY_RECENT_MESSAGES = gql `
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

export const QUERY_USER_MESSAGES = gql`
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