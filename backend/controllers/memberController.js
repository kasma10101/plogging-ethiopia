//controller of member
Member = require('../models/member');
Admin = require('../models/admin');

const getMembers = async function(req, res, next) {
  try{

    const totalDocument = await Member.countDocuments();
    const totalPage = Math.ceil(totalDocument / 9);

    const page = parseInt(req.query.page);

    if (page > totalPage) {

      return res.status(400).send({
        message: "Page not found",
        members: []
      });
    }

    const members = await Member.find().skip((page - 1) * 9).limit(9);
    res.send(
      {
        members: members,
        totalPage: totalPage
      }
    );
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getMember = async function(req, res, next) {
  try{
    const member = await Member.findById(req.params.id);
    res.send(member);

  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const createMember = async function(req, res, next) {

  try{
    const member = await Member.create(req.body);
    res.send(member);

  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const createAdmin = async function(req, res, next) {

  try{
    const member = await Admin.create(req.body);
    res.send(member);

  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const adminLogin = async function(req, res, next) {
  try{
    const admin = await Admin.findOne({email: req.body.email, password: req.body.password});
    if(admin) {
      res.status(200).send(admin);
    } else {
      res.status(400).send({message: "Invalid email or password"});
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}

const updateMember = async function(req, res, next) {

  try{
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(member)

  } catch(error){
    res.status(400).send({message: error.message});
  }
};

const deleteMember = async function(req, res, next) {

  try {
    console.log(req.params.id)
    const member = await Member.findByIdAndDelete(req.params.id);
    res.send(member);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const searchMember = async function(req, res, next){
  try{
    const member = await Member.find({ title: { $regex: new RegExp(req.body.term, 'i') } })
  }catch (e) {
    res.status(500).send({message: e.message})
  }
}

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  searchMember,
  createAdmin,
  adminLogin,
};