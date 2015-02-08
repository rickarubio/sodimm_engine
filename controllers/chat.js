// var _ = require('lodash');
// var async = require('async');
var Chat = require('../models/Chat');
var Message = require('../models/Message');
var User = require('../models/User');
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
  });
};

/**
 * POST /chat
 * create a new chatroom. Room name is passed in the req.body
 * @param {object} req - request
 * @param {object} res - response
 * @returns {null} void
 */
exports.createChatroom = function(req, res) {
  console.log('body:', req.body);
  var newChatroom = new Chat({
    name: req.body.name,
    topic: req.body.topic,
    slug: req.body.name.replace(/\W+/g, '_')
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

    Chat.findOne({ slug: req.params.roomId }, function(err, room) {
      if (err) { throw err; }

      res.json({
        slug: req.params.roomId,
        topic: room.topic,
        name: room.name,
        messages: docs
      });
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
  console.log('user is:', req.user);
  User.findById(req.user._id, function(err, user) {
    if (err) { throw err; }

    console.log('user is', user.profile);
    var message = new Message({
      userId: req.user._id,
      author: user.profile.name,
      roomId: req.params.roomId,
      message: req.body.message,
      created: new Date()
    });
    console.log('message is:', message);

    message.save(function(err) {
      if (err) { throw err; }

      res.json(message);
    });
  });
};

/**
 * GET /members/:roomId
 * returns all members in a room
 * @param {object} req - request
 * @param {object} res - response
 * @returns {null} void
 */
exports.getMembers = (function(req, res) {
	var names = [];

	Message.find({ roomId: req.params.roomId }, function(err, messages) {
		if (err) { throw err; };
		messages.forEach(function(message){
			var userId = message.userId;
			User.findOne({_id:userId},function(err,user){
				names.push(user.profile.name);
			})
		});
		res.json(names);
	});
});

