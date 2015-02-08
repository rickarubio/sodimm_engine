var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  name: String,
  topic: String,
  popularity: Number
  },

});

module.exports = mongoose.model('Chat', chatSchema);
