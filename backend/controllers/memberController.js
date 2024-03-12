//controller of member
Member = require('../models/member');

const getMembers = async function(req, res, next) {
  try{

    const totalDocument = await Member.countDocuments();
    const totalPage = Math.ceil(totalDocument / 9);

    const page = Math.max(1, parseInt(req.query.page) || 1);

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


 const createAdmin= async (req,res)=>{
  // console.log(req.body)
  const {
      name,
      email,
      password,
      role,
  } = req.body;
  // console.log(req.body)
  try {
const member= new Member({
          name:name,
          email:email,
          role:role,
          password:password,
          phoneNumber:'091999991'

      })
      const savedMember= await member.save();

      if (!savedMember) {
          return res.status(400).json({ message: "cannot be created " });
        }
        return res.status(201).json({savedMember});
    

  } catch (error) {
      console.log(error)
    
  }
}

const getAdmin = async(req,res) =>{

  try {
     const admins = await Member.find()
     if(!admins){
      return res.status(404).json({message:"not found"})
     }

     return res.status(200).json(admins)
  } catch (error) {
    
  }
}

const MemberLogin = async function(req, res, next) {
  try{
    const Member = await Member.findOne({email: req.body.email, password: req.body.password});
    if(Member) {
      res.status(200).send(Member);
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
    // console.log(req.params.id)
    const member = await Member.findByIdAndDelete(req.params.id);
    if(!member){
      return res.status(404).json({message:"not found"})
    }
    return res.send({member:"deleted successfully"});
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
  MemberLogin,
  getAdmin
};