const { User, Chat, Message } = require("../../models");
const { signToken, AuthenticationError } = require("../../utils/auth");

const userResolvers = {
    Query: {
        getContacts: async ( parent, args, context ) => {
        if (context.user ) {
            try {
                const contacts = await User.find({});
                return contacts
            } catch (error) {
        } throw new Error("Could not fetch contacts");
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

        const correctPw = await User.isCorrectPassword(password);

        if (!correctPw) {
            throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
    },
    addContact: async ( parent, {userId, contactId, context } ) => {
        if (context.user ) {
            try {
                const UserRelationship = new UserRelationship({
                    user: userId,
                    contact: contactId,
                });
                await UserRelationship.save();
                return UserRelationship;
            } catch (error) {
         throw new Error("Could not add contact");
        }
   } else {
    throw new Error("Unauthorized")
    }
  },
 },
};

module.exports = userResolvers;