const { userContacts, User } = require("../../models");


const contactResolvers = {
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
 addContact: async ( parent, {userId, contactId, context } ) => {
    if (context.user ) {
        try {
            const UserRelationship = new userContacts({
                user: userId,
                contact: contactId,
            });
            await userContacts.save();
            return userContacts;
        } catch (error) {
     throw new Error("Could not add contact");
    }
} else {
throw new Error("Unauthorized")
}
},
 },
};


module.exports = contactResolvers;