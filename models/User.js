const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    //required: true
    //default: "Liz"
  },
  email: {
    type: String,
    //required: true
    //default: "lizdog@yahoo.com"
  },
  password: {
    type: String,
    //required: true
    //default: "myPassword"
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.Now
  },
});

module.exports = User = mongoose.model('users', UserSchema);