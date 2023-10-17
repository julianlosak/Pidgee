const { User, Chat, Message } = require("../../models");

const messageResolvers = {
Query: {
    chatMessages: async (parent, { chatId }, context) => {
       if(context.user) {
        const userChatMessages = await Message.find({ chat: chatId });
       
       return userChatMessages;
    }
 },

  recentMessages: async (parent, { chatId }, context) => {
    if(context.user) {
        const recentMessage = await Message.find({ chat: chatId })
        .sort({ createdAt: -1})
        .limit(1)

        return recentMessage;
    }
  },

    userMessages: async (parent, args, context) => {
        if (context.user) {
            return Message.find({ sender: context.user._id })
        }
    },
},
    searchMessages: async(parent, args) => {
        try {
            const messages = await Message.find({ content: {$regex: keyword, $options: "i"} });
            return messages;
        }  catch (error) {
            throw new Error(`Error searching messages: ${error.message}`)
        }
    },

Mutation: {
  addMessage: async (parent, { content, chatId }, context) => {

  }
}
    
  };






module.exports = messageResolvers