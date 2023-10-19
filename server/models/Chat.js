const { Schema, model} = require("mongoose");

const chatSchema = new Schema({
    chatName: {
        type: String,
        trim: true,
    },
    groupChat: {
        type: Boolean,
        default: false,
    },
    recentMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},

);

const Chat = model("Chat", chatSchema);

module.exports = Chat;