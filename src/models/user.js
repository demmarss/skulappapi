
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    unique: true,
  },
  grade: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
    unique: true,
  },
  created: {
    type: String,
    unique: true,
  },
  parentId: {
    type: String,
    unique: true,
  },
});

module.exports =  mongoose.model('User', UserSchema)