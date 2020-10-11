const { Schema, model } = require('mongoose');

const poll = Schema({
    guild: String,
    textChannel: String,
    message: String,
    expiryDate: Date,
});

module.exports = model('poll', poll);