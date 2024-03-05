const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  description: String,
});

const galleryModel = mongoose.model('gallery', gallerySchema);

module.exports = galleryModel;