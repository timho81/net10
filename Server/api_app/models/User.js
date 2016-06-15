// User model
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uuid = require('node-uuid');

var UserSchema = new mongoose.Schema({
  _id: { type: String, default: uuid.v4}, // Randomly generated uuid
  username: {type: String, unique: true, required: true},
  hashedPassword: String, // one-way hashed password
  salt: String,
  email: {type: String, unique: true, required: true},
  firstName: String,
  lastName: String,
  authorities: [String]
});
UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hashedPassword = crypto.pbkdf2Sync(password, this.salt,1000,64).toString('hex');
};
UserSchema.methods.validPassword = function(password) {
  var hashedPassword = crypto.pbkdf2Sync(password, this.salt,1000,64).toString('hex');
  return this.hashedPassword === hashedPassword;
};
UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, '01ten_secret' );
};

module.exports = mongoose.model('User', UserSchema);