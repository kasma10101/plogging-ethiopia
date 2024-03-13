//controllers of blog
Blog = require('../models/blog');
Member = require('../models/member');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken')
const nodemailer =  require('nodemailer')

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
const JWT = "some_secret";
const forgotPassword =  async(req,res) => {

  const { email } = req.body;
  // console.log(email,'email')

  try {
    const user = await Member.findOne({email});
    // console.log(user,'ooo')
    if (user===null || email !== user.email) {
      return res.status(404).json({ message: "no user found" });
    }

    const secret = JWT + user.password;
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "30m" });

    const link = `http://localhost:3000/reset-password`;
    //send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fayomuhe5@gmail.com",
        pass: "vypd cqxp eqqm krsg",
        port: 465,
        secure: true,
      },
    });
    const mailOptions = {
      from: "fayomuhe5@gmail.com",
      to: email,
      subject: "Plogging Ethiopia.",
      html: `<p>Password Reset</p>
             <p>Please follow this link to reset your password!</p>
             <a href=${link}>Reset!</a>
             `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error,'hre');
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(200).json({message:'sent',id:user.id});
  } catch (error) {
     console.log(error)
      return res.status(500).json(error);
  }
};

const resetPassowrd =  async (req, res) => {
  const {id } = req.params;
  const { password, password2 } = req.body;
  let user

  try {
    user = await Member.findById(id);
    if (!user) {

      return res.status(404).json(' user not found');
    }

    // const secret = JWT + user.password;
    // const payload = jwt.verify(token, secret);
    if (password !== password2) {

      return res.status(400).json({message:'password do not match'});
    }
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    user.password = password;
    const saved =  await user.save();
     if(!saved){

       return res.status(500).json({message:"something went wrong"});
      }

    return res.status(200).json({message:'your password ressed successfully '});
  } catch (error) {
    return res.status(500).json({message:error});
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  forgotPassword,
  resetPassowrd
};