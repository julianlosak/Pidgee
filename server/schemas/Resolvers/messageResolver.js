const { User, Chat, Message } = require("../../models");

const messageResolvers = {
Query: {
    userMessages: async (parent, args, context) => {
        const { userId } = args;
        const { currentUser } = context;

        if( currentUser && currentUser._id.toString() === userId) {
            try {
    const userMessages =  await Message.find({ sender: userId});
    return userMessages;
   } catch (error) {
     throw new Error(`Error fetching messages for user ${userId}: ${error.message}`);
   } 
} else {
    throw new Error("You are not the authorized user");
   }
}

},
    searchMessages: async(parent, args) => {
        try {
            const messages = await Message.find({ content: {$regex: keyword, $options: "i"} });
            return messages;
        }  catch (error) {
            throw new Error(`Error searching messages: ${error.message}`)
        }
    }
    
  };






module.exports = messageResolvers