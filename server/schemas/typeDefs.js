const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        isAdmin: Boolean
        contacts: [User]
    }

    type Chat {
        chatName: String
        groupChat: Boolean
        recentMessage: Message
        users: [User]
        groupAdmin: User
        createdAt: String
        updatedAt: String
    }

    type Message {
        sender: User
        content: String
        chat: Chat
        createdAt: String
        updatedAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        contacts(userId: ID!): [User]
        getChat(chatId: ID!): Chat
        getAllChats: [Chat]
        chatMessages(chatId: ID!): [Message]
        recentMessage(chatId: ID!, limit: Int!): [Message]
        userMessages(userId: ID!): [Message]
        searchMessages(keyword: String!): [Message]
        chatUsers(chatId: ID!): [User]
        userParticularChat(chatId: ID!, userId: ID!): Boolean 
        seachUsers(query: String!): [User]
    }
    input chatNameInput {
        chatId: ID!
        chatName: String
    }

    type Mutation {
        createChat(username: String!, email: String!): Chat
        addUser(username: String!, email: String!, password: String!): Auth
        deleteUser(userId: ID!): User
        login(email: String!, password: String!): Auth
        addMessage(Content: String!, chatId: ID!): Message
        deleteMessage(messageId: ID!): Message
        readMessages(chatId: ID!, userId: ID!): Boolean
        chatName(chatInput: chatNameInput): Chat
    }
`

module.exports = typeDefs;