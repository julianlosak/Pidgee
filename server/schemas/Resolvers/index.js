const userResolvers = require("./userResolvers");
const messageResolvers = require("./messageResolver");
const chatResolvers = require("./chatResolvers");

const resolvers = {
    Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
    ...chatResolvers.Query,
    
},
Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...chatResolvers.Mutation,
    
},
};

module.exports = resolvers