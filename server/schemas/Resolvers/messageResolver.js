const { User, Chat, Message } = require("../../models");

const messageResolvers = {
Query: {
    userMessages: async(parent, args) => {
        const { userId } = args;
        try {
            const messages = await getUserMessages(userId);
            return messages;
        } catch (error) {
            throw new Error(`Error fetching messages for user ${userId}: ${error.message}`);
        }
    },
  },
};





module.exports = messageResolvers