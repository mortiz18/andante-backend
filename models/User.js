const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const pass = require('../services/passport')

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

userSchema.plugin(uniqueValidator, {
  message: 'Username has been taken!'
});

userSchema.pre('save', function(next){
  if(!this.isModified('password')){ return next();}

  //else hash password and store in db
  this.password = this._hashPassword(this.password);
  return next();
});

userSchema.methods = {
  _hashPassword(password){
    return bcrypt.hashSync(password, 8);
  },
  authenticateUser(password, callback){
    bcrypt.compare(password, this.password, callback);
  }
}

var User = module.exports = mongoose.model('User', userSchema);

//Functions
module.exports.getUsers = function(callback, limit){
  User.find(callback).limit(limit);
};

module.exports.signUp = function(user, callback){
  User.create(user, callback);
};

module.exports.logIn = function(user, callback){
  var query = {username: user};
  User.find(query, callback);
};

module.exports.getUser = function(user, callback){
  var query = {username: user};
  User.find(query, callback);
};
