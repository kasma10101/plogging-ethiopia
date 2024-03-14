const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  email:String,
  
});

const subModel = mongoose.model('sub', subSchema);

module.exports = subModel;