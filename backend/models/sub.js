const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  subscription: String,
  
});

const subModel = mongoose.model('sub', subSchema);

module.exports = subModel;