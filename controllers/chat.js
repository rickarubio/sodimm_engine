// var _ = require('lodash');
// var async = require('async');
var Chat = require('../models/Chat');
// var secrets = require('../config/secrets');

/**
 * GET /chat
 * Returns sorted list of the most popular chatrooms on the system
 * @param {object} req - request
 * @param {object} res - response
 * @returns {null} void
 */
exports.getChatrooms = function(req, res) {
  Chat.find(function (err, chats) {
    if (err) { throw err; }

    res.json(chats);
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
    name: 'test',
    topic: 'test topic'
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
  req.logout();
  res.redirect('/');
};

/**
 * POST /chat/:roomId
 * publish a message into the chatroom
 * @param {object} req - request
 * @param {object} res - response
 * @param {object} next - next
 * @returns {null} void
 */
exports.createChatroom = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};
