const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true},
  phoneNumber: String,
  password: String,
});

const memberModel = mongoose.model('member', memberSchema);

module.exports = memberModel;