const { User, Chat, Message } = require("../../models");
const { signToken, AuthenticationError } = require("../../utils/auth");

const userResolvers = {
    Query: {
        getContacts: async (_, { userId }, context) => {
            if(context.user) {
            try {
              const user = await User.findById(userId).populate("contacts");

              if (!user) {
                throw new Error('User not found');
              }
              return user.contacts;
            } catch (error) {
              throw new Error('Could not fetch contacts:' + error.message);
            }
        } else {
            throw new Error("User is not authenticated");
        }
          },
  
     },

        

Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        
        if (!user) {
            throw AuthenticationError;
        }

        const correctPw = await User.isCorrectPassword(password);

        if (!correctPw) {
            throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
    },

    deleteUser: async(parent, { userId }, context) => {
        if(context.user) {
            try {
                const deletedUser = await User.findByIdAndRemove(userId);

                return deletedUser
;
            } catch (error) {
                throw new Error("Could not delete the user:" + error)
            }
          
        }
    },

    addContact: async(parent, { userId }, context) => {
        if(context.user) {
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    context.user_id,
                    { $addToSet: { contacts: userId }},
                    { new: true }
                );

                return updatedUser;
          
              } catch (error) {
                throw new Error("Cound not add user:" + error)
              }
        }
    }
  },
};

module.exports = userResolvers;