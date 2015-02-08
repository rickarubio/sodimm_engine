// var _ = require('lodash');
// var async = require('async');
var Chat = require('../models/Chat');
var Message = require('../models/Message');
// var secrets = require('../config/secrets');

/**
 * GET /chat
 * Returns sorted list of the most popular chatrooms on the system
 * @param {object} req - request
 * @param {object} res - response
 * @returns {null} void
 */
exports.getChatrooms = function(req, res) {
  Chat.find(function (err, chatrooms) {
    if (err) { throw err; }

    res.json({ rooms: chatrooms });
    // res.render('chatroom', {
    //   title: 'Chat Rooms',
    //   chatrooms: chatrooms
    // });
  });
};

/**
 * POST /chat
 * create a new chatroom. Room name is passed in the req.body
 * @param {object} req - request
 * @param {object} res - response
 * @param {object} next - next
 * @returns {null} void
 */
exports.createChatroom = function(req, res) {
  var newChatroom = new Chat({
    name: req.body.name,
    topic: req.body.topic
  });
  newChatroom.save(function (err, doc) {
    if (err) { throw err; }

    res.json(doc);
  });
};

/**
 * GET /chat/:roomId
 * returns a single chatroom with 10 previous messages
 * @param {object} req - request
 * @param {object} res - response
 * @returns {null} void
 */
exports.getChatroom = function(req, res) {
  Message.find({ roomId: req.params.roomId }, function(err, docs) {
    if (err) { throw err; }

    res.json({
      name: req.params.roomId,
      messages: docs
    });
  });
};

/**
 * POST /chat/:roomId
 * publish a message into the chatroom
 * @param {object} req - request
 * @param {object} res - response
 * @param {object} next - next
 * @returns {null} void
 */
exports.postMessage = function(req, res) {
  var message = new Message({
    userId: req.body.userId,
    roomId: req.params.roomId,
    message: req.body.message
  });

  message.save(function(err) {
    if (err) { throw err; }

    res.json(message);
  });
};
