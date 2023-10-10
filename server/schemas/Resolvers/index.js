const userResolvers = require("./userResolvers");
const messageResolvers = require("./messageResolver");
const chatResolvers = require("./chatResolvers");

const resolvers = {
    ...userResolvers,
    ...messageResolvers,
    ...chatResolvers
};

module.exports = resolvers