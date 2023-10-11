const { User, Chat, Message } = require("../models");

const chatResolvers = {
    Query: {
        // Resolver for getting a specific chat by its ID
        getChat: async (_, { chatId }) => {
          try {
            const chat = await Chat.findById(chatId);
            return chat;
          } catch (error) {
            throw new Error('Could not fetch chat');
          }
        },
      },
      Mutation: {
        // Resolver for creating a new chat
        createChat: async (_, { chatInput }) => {
          const { members, messages } = chatInput;
    
          const newChat = new Chat({
            members,
            messages,
          });
    
          const chat = await newChat.save();
          return chat;
        },
      },
      Chat: {
        // Resolver for resolving messages for a chat
        messages: async (parent) => {
        try {
            const messages = await Message.find({ chat: parent._id });
            return messages;
          } catch (error) {
            throw new Error('Could not fetch messages for this chat');
          }
        },
        // Resolver for resolving members for a chat
        members: async (parent) => {
        try {
            const members = await User.find({ _id: { $in: parent.members } });
            return members;
            } catch (error) {
            throw new Error('Could not fetch members for this chat');
        }
      },
    }
}

module.exports = chatResolvers;