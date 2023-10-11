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
      if(context.user) {
        const newMessage = new Message({
            content, 
            chat: chatId,
            sender: context.user_id,
        });
      
        await newMessage.save();
    }     
  
},

deleteMessage: async (parent, { messageId }, context) => {
    if(context.user) {
      const message = await Message.findById(messageId);
       if (!message) {
        throw new Error("Message not found");
       }

    if(message.sender.toString() !== context.user._id.toString()) {
        throw new Error("You are not authorized to delete this message");
    }
    await message.remove();

    return message;
  }     

}
  }

};




module.exports = messageResolvers