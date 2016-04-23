'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  stormpathID: Number,
  name: String,
  image: String,
  email: String,
  restuarants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
  createdAt: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
