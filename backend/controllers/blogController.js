// Importing the models
const Blog = require('../models/blog'); // Assuming this now points to your Sequelize model
const Member = require('../models/member'); // Assuming this now points to your Sequelize model
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const getBlogs = async function (req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const {count, rows} = await Blog.findAndCountAll({
            limit: limit,
            offset: offset
        });
        res.send({
            blogs: rows,
            totalCount: count,
        });
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};

const getBlog = async function (req, res, next) {
    try {
        const blog = await Blog.findByPk(req.params.id);
        res.send(blog);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};

const createBlog = async function (req, res, next) {
    try {
        const blog = await Blog.create(req.body);
        res.send(blog);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};

const updateBlog = async function (req, res, next) {
    try {
        const blog = await Blog.update(req.body, {
            where: {id: req.params.id},
            returning: true,
        });
        res.send(blog);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};

const deleteBlog = async function (req, res, next) {
    try {
        await Blog.destroy({
            where: {id: req.params.id}
        });
        res.send({message: 'Blog deleted successfully'});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};

// Note: The forgotPassword and resetPassword methods do not directly interact with the blog data and remain more or less the same. However, ensure Member points to the Sequelize model, and adjust methods for finding, updating, or deleting members as needed.

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    // forgotPassword,
    // resetPassowrd
};
