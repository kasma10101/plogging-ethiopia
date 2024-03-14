//controller of member
Member = require('../models/member');
Sub = require('../models/sub');
Event = require('../models/event');
AdminEvent = require('../models/AdminEvent');
jwt = require('jsonwebtoken')

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
 createEvent = async function(req, res, next) {
   const {  name,
    email,
    who,
    date,
    agreement,
    createdBy,} = req.body
  try{
    const event = new Event({
      email:email,
      who:who,
      date:date,
      agreement:agreement,
      createdBy:'user',
    });
    const savedMember= await event.save();

    if (!savedMember) {
        return res.status(400).json({ message: "cannot be created " });
      }
      return res.status(201).json({savedMember});
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getEvent = async(req,res) =>{
   
     try {
         const event  = await Event.find();
           if(!event){
            return res.status(404).json('not found')
           }
           return res.status(200).json(event)
     } catch (error) {
      return re.status(500).json(error)
     }
}

const deleteEvent = async(req,res) =>{
    try {
       const event = await Event.findByIdAndDelete(req.params.id)
       if(!event){
       return res.status(500).json({message:'error occurred'})
       }
       return res.status(200).json({message:"deleted"})
    } catch (error) {
       return res.status(500).json(error)
    }
}

createAdminEvent = async function(req, res, next) {
  console.log(req.body)
 try{

   const event = new AdminEvent(req.body);
   const savedMember= await event.save();

   if (!savedMember) {
       return res.status(400).json({ message: "cannot be created " });
     }
     return res.status(201).json({savedMember});
 } catch (error) {
  console.log(error)
   res.status(400).send({message: error.message});
 }
};
const getAdminEvent = async(req,res) =>{
   try {
      const event = await AdminEvent.find();
      if(!event){
        return res.status(404).json('not found')
      }
      return res.status(200).json(event)
   } catch (error) {
    return res.status(500).json(error)
   }
}
const deleteAdminEvent = async(req,res) =>{
  try {
     const event = await AdminEvent.findByIdAndDelete(req.params.id)
     if(!event){
     return res.status(500).json({message:'error occurred'})
     }
     return res.status(200).json({message:"deleted"})
  } catch (error) {
     return res.status(500).json(error)
  }
}
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
    const member = await Member.findOne({email: req.body.email, password: req.body.password});
    if(member) {
      return res.status(200).send(member);
    } else {
     return res.status(400).send({message: "Invalid email or password"});
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
const addSub = async(req,res) =>{
  try {
     const sub = new Sub(req.body)
      const savedSub = await sub.save();
      if(!savedSub){
        return res.status(400).json('error')
      }
      return res.status(201).json('created')
  } catch (error) {
    return res.status(400).json(error)

  }
}

const getSub = async(req,res) =>{
  try {
      const sub = await Sub.find();
       
       if(!sub){

        return res.status(404).json('not found sub')
       }
       return res.status(200).json(sub)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteSub = async(req,res) =>{
  try {
      const sub = await Sub.findByIdAndDelete(req.params.id)
      if(!sub){
        return res.status(404).json('sub not found')
      }
      return res.status(200).json('deleted')
  } catch (error) {
    return res.status(500).json(error);
  }
}
const forgotPassword =  async(req,res) => {
  const { email } = req.body;
  let error = [];

  try {
    const user = await Member.findOne({ email });
    if (email !== user.email) {
      error.push({ message: "email not registered" });
      return res.send({ message: "no user found" });
    }

    const secret = JWT + user.password;
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "30m" });

    const link = `http://localhost:4000/reset-password/${user.id}/${token}`;
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
      subject: "VCO charity Org.",
      html: `<p>Password Reset</p>
             <p>Please follow this link to reset your password!</p>
             <a href=${link}>Reset!</a>
             `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
     error.push({msg:"Reset link sent check your email!"})
    return res.send(error);
  } catch (error) {
     error.push({msg:error})
      return res.status(500).json(error);
  }
};
router.get("/reset-password/:id/:token", async (req, res) => {
  const { token, id } = req.params;
  let user,
    error = [];
 console.log(' here is id')
  try {
    user = await Member.findById(id);
    if (!user) {
      error.push({ msg: "something went wrong" });
      return res.render('front-page/forgot-password',{error});
    }

    const secret = JWT + user.password;
    const payload = jwt.verify(token, secret);
    error = ''
    return res.render("front-page/reset-password", { token: token, id: id,error:error});
  } catch (error) {
    error.push({msg:error.messaage})
    return res.render('front-page/forgot-password',{error});

  }
});

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  searchMember,
  createAdmin,
  getAdmin,
  addSub,
  createEvent,
  getEvent,
  deleteEvent,
  createAdminEvent,
  getAdminEvent,
  deleteAdminEvent,
  MemberLogin,
  forgotPassword,
  getSub,
  deleteSub
};