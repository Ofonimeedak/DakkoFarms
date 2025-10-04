const express=require('express')
const authController=require('../Controller/googleSignup')

const Routes=express.Router();



Routes.get("/login", authController.login);
Routes.get("/callback", authController.redirect);

module.exports=Routes;