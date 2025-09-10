const urlModel=require('./urlModel');

const {nanoid} =require('nanoid');
const validator=require('validator')


exports.short = async (req, res)=>{

const {originalUrl}=req.body;
const shortId=nanoid(7);

try{ const options={require_protocol:false}

    if(!validator.isURL(originalUrl,options)){
        return res.status(400).json({message:"bad request"})
    }
   const  newUrl= await urlModel.create({shortId,originalUrl })

res.status(201).json({message:"new Url created successfully", data:`localhost:3000/url/short/${shortId}`})
}catch(err){
res.status(500).json({message: err.message})

}};

exports.getShortUrl= async(req,res)=>{


    const {shortId}=req.params;

    if(!shortId){
        return res.status(400).json({message:"invalid url"});

    }
    try{
        const entry= await urlModel.findOne({shortId});
        console.log(entry)
        if(!entry){
            return res.status(404).json({message:"page not found"})
        }

       return  res.redirect(301, entry.originalUrl);


    }catch(err){
 return res.status(500).json({message:err.message});

 }

}



