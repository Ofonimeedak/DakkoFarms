const mongoose =require('mongoose');

const UrlSchema= new mongoose.Schema({

    shortId:{
        type:String,
        unique:true
    },
    originalUrl:{
        type:String
    }

});

const UrlModel= mongoose.model("Url",UrlSchema);
module.exports=UrlModel;