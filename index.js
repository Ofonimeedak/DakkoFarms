const app=require('./app')

const mongoose=require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGOOSE_STRG).then(()=>{
  
  console.log("Data base connected successfully");
  

}).catch((err)=>{
  console.log(err)

})

