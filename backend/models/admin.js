const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true},
  phoneNumber: String,
  password: String,
  isAdmin:{
    type:Boolean,
    default:true
  } 
});

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;