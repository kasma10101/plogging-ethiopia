const mongoose = require('mongoose');

const adminEventSchema = new mongoose.Schema({
    name:String,
    description:String,
    date:String,
   place:String,
   imageUrl:String
});

const adminEventModel = mongoose.model('adminEvent', adminEventSchema);

module.exports = adminEventModel;