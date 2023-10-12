const db = require('../config/connection');
const { Chat, Message } = require('../models');
const chatSeeds = require('./chatSeeds.json');
const messageSeeds = require('./messageSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean existing chat and message data
    await cleanDB('Chat', 'chats');
    await cleanDB('Message', 'messages');

    // Seed chats
    await Chat.create(chatSeeds);

    // Seed messages and associate them with chats
    for (let i = 0; i < messageSeeds.length; i++) {
      const { _id, chatId } = await Message.create(messageSeeds[i]);
      const chat = await Chat.findOneAndUpdate(
        { _id: chatId },
        {
          $addToSet: {
            messages: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seed completed!');
  process.exit(0);
});
