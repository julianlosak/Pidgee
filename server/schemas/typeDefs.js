const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        isAdmin: Boolean
        
    }
    
    type UserContacts {
        user: User
        contact: User
    }

    type Chat {
        _id: ID
        chatName: String
        groupChat: Boolean
        createdAt: String
        updatedAt: String
        recentMessage: [Message]
        users: [User]
        groupAdmin: User
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
        getUsers: [User]
        getUser(username: String!): User
        getChat(chatId: ID!): Chat
        userChats(username: String!): [Chat]
        getAllChats: [Chat]
        getCurrentChatId: ID
        chatMessages(chatId: ID!): [Message]
        recentMessages(chatId: ID!, limit: Int!): [Message]
        userMessages(userId: ID!): [Message]
        searchMessages(keyword: String!): [Message]
        chatUsers(chatId: ID!): [User]
        userParticularChat(chatId: ID!, userId: ID!): Boolean 
        seachUsers(query: String!): [User]
        getContacts: [User]
    }

    type Mutation {
        createChat(chatName: String!): Chat
        updateChatName(chatId: ID!): Chat
        addUser(username: String!, email: String!, password: String!): Auth
        addContact(userId: ID, contact: ID!): UserContacts
        login(email: String!, password: String!): Auth
        addMessage(content: String!, chatId: ID!): Message
        readMessages(chatId: ID!, userId: ID!): Boolean
    }
`

module.exports = typeDefs;