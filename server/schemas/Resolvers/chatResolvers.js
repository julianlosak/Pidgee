const { User, Chat } = require("../../models");


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

      getAllChats: async (_, args, context) => {
          if(context.user) {
          try {
            // { users: context.user._id}
              const userChats = await Chat.find({})
              .populate({
              path: "users", 
              select: "_id username",
          })
              .populate({
              path:"recentMessage",
              select: "_id content createdAt",
              populate: {
                 path: "sender",
                 model: "User",
                 select: "username"
              },
          })
          .populate({
              path: "groupAdmin",
              model: "User",
              select: "username",
          });
          return userChats;
       } catch (error) {
          throw new Error("Could not fetch user chats")
       }
      }
    },

    getCurrentChatId: async(_, args, context) => {
    if(true) {
      try {
        const userChats = await Chat.find({ users: context.user._id})

      const currentChatId = userChats[0]
      // getUserCurrentChatId(context.user.id) ;

      return currentChatId;

      } catch (error) {
        console.log(error);
    throw new Error("Could not fetch chat id")
  }
    } else {
      throw new Error("User could not be authenticated")
    }
  },
},
  
    Mutation: {
      // Resolver for creating a new chat
      createChat: async (_, { chatName }, context) => {
        if(context.user) {
          try {
            console.log("Recieved chat name:", chatName);

            const newChat = new Chat({
              chatName,
              createdBy: context.user.username

            });

            const chat = await newChat.save();
        return chat;
          } catch (error) {
            throw new Error(`Error creating chat:" ${error.message}`)
  
        } 
        
        }
     
      },

      updateChatName: async (_, { chatId }, context ) => {
          if(context.user) {
            try {
          const chatToUpdate = await Chat.findOne({ _id: chatId, users: context.user._id});
    
          if(!chatToUpdate) {
            throw new Error("Chat not found or user does not have access");
          }
          
          const updatedChat = await chatToUpdate.save();
          return updatedChat;
        } catch (error) {
        throw new Error("Error updating chat name:" + error.message);
        }
      }
      }
    },

    Chat: {
      // Resolver for resolving members for a chat
      users: async (parent) => {
      try {
          const members = await User.find({ _id: { $in: parent.members } });
          return members;
          } catch (error) {
          throw new Error('Could not fetch members for this chat');
      }
    },
  },
 
  };


module.exports = chatResolvers;