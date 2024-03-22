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
    const member = await Member.findByPk(req.params.id);
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
const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: 'user',
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};


const getEvent = async (req, res) => {
  try {
    const events = await Event.findAll(); 
    if (events.length === 0) {
      return res.status(404).json('Not found');
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error.message); // Adjusted to send back error.message for consistency
  }
};


const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Event.destroy({
      where: { id: id }
    });
    if (!deleted) {
      return res.status(404).json({message: 'Event not found'});
    }
    res.status(200).json({message: "Deleted successfully"});
  } catch (error) {
    res.status(500).json(error.message);
  }
};


const createAdminEvent = async (req, res) => {
  try {
    const event = await AdminEvent.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).send({message: error.message});
  }
};

const getAdminEvent = async(req,res) =>{
   try {
      const event = await AdminEvent.findAll();
      if(!event){
        return res.status(404).json('not found')
      }
      return res.status(200).json(event)
   } catch (error) {
    return res.status(500).json(error)
   }
}
const deleteAdminEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await AdminEvent.destroy({
      where: { id: id }
    });
    
    if (result === 0) {
      return res.status(404).json({ message: 'Admin Event not found' });
    }
    
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newAdmin = await Member.create({
      name: name,
      email: email,
      role: role,
      password: password,
      phoneNumber: '091999991' 
    });

    return res.status(201).json({ newAdmin });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not create admin", error: error.message });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admins = await Member.findAll({
    });

    if (admins.length === 0) {
      return res.status(404).json({ message: "No admins found" });
    }

    return res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while fetching the admins", error: error.message });
  }
};


const MemberLogin = async function(req, res, next) {
  try{
    const member = await Member.findOne({ where: { email: req.body.email } });
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
  const { id } = req.params;
  try {
    const [updated] = await Member.update(req.body, {
      where: { id: id }
    });

    if (!updated) {
      return res.status(404).send({message: 'Member not found'});
    }

    const updatedMember = await Member.findByPk(id);
    if (!updatedMember) {
      return res.status(404).send({message: 'Member not found after update'});
    }

    res.send(updatedMember);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const deleteMember = async function(req, res, next) {
 const id = req.params.id
  try {
    // console.log(req.params.id)

    const member = await Member.destroy({
      where:{id:id}
    });
    if (deleted === 0) {
      return res.status(404).json({message: "Member not found"});
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
const addSub = async (req, res) => {
  try {
    const savedSub = await Sub.create(req.body);
    return res.status(201).json('created');
  } catch (error) {
    return res.status(400).json(error);
  }
};


const getSub = async(req,res) =>{
  try {
      const sub = await Sub.findAll();
       
       if(sub.length === 0){

        return res.status(404).json('not found sub')
       }
       return res.status(200).json(sub)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteSub = async(req,res) =>{
  try {
      const id = req.params.id
      const sub = await Sub.destroy({
        where:{id:id}
      })
      if(sub.length === 0){
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
    const user = await Member.findOne({where: email });
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
    user = await Member.findByPk(id);
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