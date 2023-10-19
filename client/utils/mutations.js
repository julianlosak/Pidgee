import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
mutation deleteUser($userId: ID!) {
  deleteUser(userId: $userId) {
    _id
  }
}
`;

export const ADD_CONTACT = gql`
mutation addContact($userId: ID!) {
  addContact(userId: $userId) {
    _id
  }
}
`;

export const CREATE_CHAT = gql`
  mutation createChat($chatName: String!) {
    createChat(chatName: $chatName) {
    chatName
  }
  }
`;

export const UPDATE_CHAT_NAME = gql`
mutation updateChatName($chatId: ID!, $newName: String!) {
  updateChatName(chatId: $chatId, newName: $newName) {
    chatName
  }
}
`;


export const ADD_MESSAGE = gql`
mutation addMessage($content: String!, $chatId: ID!) {
  addMessage(content: $content, chatId: $chatId) {
    sender {
      username
    }
    content
    createdAt
    updatedAt
  }
}
`;

export const DELETE_MESSAGE = gql`
mutation deleteMessage($messageId: ID!) {
  deleteMessage(messageId: $messageId) {
    content
    sender {
      username
    }
    createdAt
    updatedAt
  }
}
`;