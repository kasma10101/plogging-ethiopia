const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email:{type:String},
  phoneNumber: String,
  password: String,
  role:String,
});

const memberModel = mongoose.model('member', memberSchema);

module.exports = memberModel;