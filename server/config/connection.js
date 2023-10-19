const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewURLParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;