//controllers of blog
Blog = require('../models/blog');
const cloudinary = require('cloudinary').v2;

const getBlogs = async function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const blogs = await Blog.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.send(
      {
        blogs: blogs,
        totalCount: blogs.length,
      }
    );
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getBlog = async function(req, res, next) {
  try{
    const blog = await Blog.findById(req.params.id);
    res.send(blog);

  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const createBlog = async function(req, res, next) {

  try {
    const blog = await Blog.create(req.body);
    res.send(blog);

  } catch (error) {
    res.status(400).send({message: error.message});

  }
};

const updateBlog = async function(req, res, next) {

  try{
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(blog)

  } catch(error){
    res.status(400).send({message: error.message});

  }
};

const deleteBlog = async function(req, res, next) {

  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.send(blog);

  } catch (error) {

    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};