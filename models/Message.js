var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    userId : String,
    roomId : String,
    created : Date,
    message : String,
    author: String,
    score : String
});

module.exports = mongoose.model('Message', messageSchema);
