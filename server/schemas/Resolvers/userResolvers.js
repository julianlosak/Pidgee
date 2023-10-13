const { User, Chat, Message } = require("../../models");
const { signToken, AuthenticationError } = require("../../utils/auth");

const userResolvers = {
    Query: {
        
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
    deleteUser: async(parent, {userId}, context) => {
        if(context.user) {
            try {
                const deletedUser = await User.findByIdAndRemove(userId);

                return deletedUser
;
            } catch (error) {
                throw new Error("Could not delete the user:" + error)
            }
          
        }
    }
  },
};

module.exports = userResolvers;