const mongoose = require('mongoose');

const userUploadedDataSchema = new mongoose.Schema({
  name: String,
  fileName: String,
  fileType: String,
  description: String,
  createdAt : { type : Date, default: Date.now }
});

const userUploadedDataModel = mongoose.model('userUploadedData', userUploadedDataSchema);

module.exports = userUploadedDataModel;