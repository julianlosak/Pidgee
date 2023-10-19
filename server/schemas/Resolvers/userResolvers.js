const { User, Chat, Message } = require("../../models");
const { signToken, AuthenticationError } = require("../../utils/auth");

const userResolvers = {
    Query: {

      getUser: async (parent, {username}, context) => {
        if(context.user) {
            try {
                const singleUser = await User.findOne({username: username});
                return singleUser
            } catch (error) {
                throw new Error("Could not fetch user")
            }
        }
    },

    getUsers: async (parent, args, context) => {
        if(context.user) {
            try {
                const users = await User.find({});
                return users
            } catch (error) {
        } throw new Error("Could not fetch users");
    }

}
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

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
    },
    
 },
    
 };
 

module.exports = userResolvers;