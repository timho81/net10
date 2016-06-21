// User model
// var util = require('util');
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uuid = require('node-uuid');

var UserSchema = new mongoose.Schema({
  _id: { type: String, default: uuid.v4}, // Randomly generated uuid
  username: {type: String, unique: true, required: true},
  hashedPassword: {type: String, unique: true, required: true}, // one-way hashed password
  salt: String,
  cell: {type: String, required: true},
  workPhone: String,
  homePhone: String,
  address: {type: String, maxlength: 200},
  email: {type: String, unique: true, required: true, match: [/.+\@.+\..+/, "Please fill an email-compliant format!"]
    // , validate: emailValidator
  },
  firstName: {type: String, required: true},
  lastName: String,
  authorities: [{type: String,
    enum: ['ROLE_ADMIN','ROLE_MANAGER','ROLE_RECRUITER','ROLE_CANDIDATE'],
    required: true
  }] // Valid role inputs must fall into these enum values
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

  // For the sake of security, JWT_SECRET is not published in a shared repository.
  // Instead, it is externalized into .env file residing under app root dir, local machine
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', UserSchema);