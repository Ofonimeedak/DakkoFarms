const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    country,
    role,
    postCode,
    address,
  } = req.body;
  try {
    //checking existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email alreday exist" });
    }

    //Hashing Password Using bcrypt

    const hashPassword = await bcrypt.hash(password, 10);

    //Creating New User
    const newUser = await userModel.create({
      email,
      firstName,
      lastName,
      phoneNumber,
      country,
      role,
      postCode,
      address,
      password: hashPassword,
    });
    if (!newUser) {
      return res.status(400).json({ message: "error creating  new user" });
    }
    const token = jwt.sign(
      {
        email: newUser.email,
        name: newUser.firstName,
        lastName: newUser.lastName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    if(token){
      res.status(201).json({message:"You have succesfully sign up",
        data:newUser,
        token:token
      })
    }
  } catch (err) {
    res.status(500).json({ message: "Error registering new user" });
  }
};

exports.login = async (req, res) => {
  const {email, password}=req.body;
  try {

    const user= await userModel.findOne({email}).select("+password");
   if(!user){
return res.status(400).json({message:"error user not found"});
   }


    const isMatch = await bcrypt.compare(password, user.password);


    if(!isMatch){

     return  res.status(401).json({message:" Unathorized user"})
     };

    const token = jwt.sign(
      {
        email: user.email,
        name: user.firstName,
        lastName: user.lastName,
        role:user.role
      },
         process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" });

     if(token){
      res.status(200).json({message:" Login Succesful",
        data:user,
        token:token
      })
    }

  } catch (err) {
    res.status(500).json({ message: "error" });
  }
};


exports.profile = async (req, res) => {
  try { 
  
    res.json({message:`Welcome ${req.user.name} to your User profile`,user:req.user})
  } catch (err) {
    res.status(500).json({ error: "invalid " });
  }
};


exports.resetPassword= async (req,res)=>{

  const {email,password}=req.body;
try{
    const  hashedPassword= await bcrypt.hash(password,10);

 const user= await userModel.findOneAndUpdate({email},
    {password:hashedPassword},
    {new:true});
    if(!user){
    return res.status(404).json({message:"User not found"})};
res.status(200).json({message:"Password reset successful", result:user})

}catch(err){ res.status(500).json({message:err.message})

}
};
exports.logout = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ error: "invalid " });
  }

};



exports.getUser = async (req, res) => {
  try {
    res.status(200).json("hello   this is a getUser  handler");
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

exports.updateUser = async (req, res) => {
  res.send("hello   this is an update  handler");

  console.log("hello this is upadte User handle");
};

exports.deleteUser = async (req, res) => {
  try {
  } catch (err) {}
};

exports.userRole = async (req, res) => {
  try {
    res.status.json("hello   this is a change user role  handler");
  } catch (err) {}
};
