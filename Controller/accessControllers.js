 exports.admin=(req,res)=>{

    res.status(200).json({message:`Welcome ${req.user.name}to admin window`})
 }

 exports.customers= (req,res)=>{

    res.status(200).json({message:`Welcome ${req.user.name} to customers window`})
 }