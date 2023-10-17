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
mutation DELETE_USER($userId: ID!) {
  deleteUser(userId: $userId) {
    _id
  }
}
`;

export const ADD_CONTACT = gql`
mutation ADD_CONTACT($userId: ID!) {
  addContact(userId: $userId) {
    _id
  }
}
`;

export const CREATE_CHAT = gql`
mutation createChat($username: String!, $email: String!) {
  createChat(username: $username, email: $email) {
    chatName
    groupChat
    users {
      username
    }
    groupAdmin {
      username
    }
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
mutation ADD_MESSAGE($content: String!, $chatId: ID!) {
  addMessage(Content: $content, chatId: $chatId) {
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
mutation DELETE_MESSAGE($messageId: ID!) {
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