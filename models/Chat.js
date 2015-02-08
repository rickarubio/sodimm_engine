var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  name: String,
  topic: String,
  popularity: Number,
  slug: String
});

module.exports = mongoose.model('Chat', chatSchema);
