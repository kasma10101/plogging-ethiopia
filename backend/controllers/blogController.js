// Assuming Blog and Member are Sequelize models
const Blog = require('../models/Blog'); // Adjust path as necessary
const Member = require('../models/Member');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Pagination and fetching blogs
const getBlogs = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Blog.findAndCountAll({
      offset,
      limit,
    });

    res.send({
      blogs: rows,
      totalCount: count,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Fetch a single blog
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.send(blog);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update an existing blog
const updateBlog = async (req, res) => {
  try {
    const [updated] = await Blog.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedBlog = await Blog.findByPk(req.params.id);
      res.send(updatedBlog);
    } else {
      res.status(404).send({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.send({ message: 'Blog deleted' });
    } else {
      res.status(404).send({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
