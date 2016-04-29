'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  likes: [{type: String }]  //objects - Restaurants
  //filters??
});

userSchema.methods.generateToken = function() {
  var payload = {
    uid: this.uid,
    _id: this._id
  };
  var token = jwt.encode(payload, JWT_SECRET);
  return token;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
