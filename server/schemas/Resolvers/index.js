const userResolvers = require("./userResolvers");
const messageResolvers = require("./messageResolver");
const chatResolvers = require("./chatResolvers");
const userContacts = require("./userContactsResolvers")

const resolvers = {
    Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
    ...chatResolvers.Query,
    ...userContacts.Query,
    
},
Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...chatResolvers.Mutation,
    ...userContacts.Mutation,
},
};

module.exports = resolvers