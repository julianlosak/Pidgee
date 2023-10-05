const typeDefs = `{
    type User {
        _id: ID
        username: String
        email: String
        isAdmin: Boolean
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
    type Query {
        
    }
}`