const { Schema, model} = require("mongoose");

const userContactsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

});
const userContacts = model("userContacts", userContactsSchema);

module.exports = userContacts;