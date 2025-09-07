
const mongoose=require('mongoose')


const userSchema= new mongoose.Schema({

firstName:{type:String, required:[true,'Firts name is required']},
lastName:{type:String, required:[true, 'Last name is required']},
email:{type:String, required:[true,'Email is required']},
password:{type:String, required:[true, 'Password is required'], select:false},
phoneNumber:{type:Number},
country:{type:String},
role:{type:String, enum:["customer", "admin" ],default:"customer"},
postCode:{type:String},
address:{type:String}}, 
{timestamps:true});

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;



