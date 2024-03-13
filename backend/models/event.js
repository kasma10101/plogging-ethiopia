const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  email:String,
  who: String,
  date: String,
  agreement:String,
  createdBy:String,
});

const eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel; 