var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  name: String,
  topic: String
});

module.exports = mongoose.model('Chat', chatSchema);
