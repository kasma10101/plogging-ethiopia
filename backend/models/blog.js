const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  description: String,
  createdAt : { type : Date, default: Date.now }
});

const blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;