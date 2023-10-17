const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        isAdmin: Boolean
    }

    type Chat {
        chatName: String
        groupChat: Boolean
        recentMessages(chatId: ID!): [Message]
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
        Chat(chatId: ID!): Chat
        userChats(username: String!): [Chat]
        Chats: [Chat]
        chatMessages(chatId: ID!): [Message]
        recentMessages(chatId: ID!, limit: Int!): [Message]
        userMessages(userId: ID!): [Message]
        searchMessages(keyword: String!): [Message]
        chatUsers(chatId: ID!): [User]
        userParticularChat(chatId: ID!, userId: ID!): Boolean 
        seachUsers(query: String!): [User]
    }

    type Mutation {
        addChat(username: String!, email: String!): Chat
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addMessage(Content: String!, chatId: ID!): Message
        readMessages(chatId: ID!, userId: ID!): Boolean
    }
`

module.exports = typeDefs;