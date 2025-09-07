const cloudinary=require('./cloudinary');
const {CloudinaryStorage}=require('multer-storage-cloudinary');
const multer=require('multer');

const storage= new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"farmProducts",
        allowed_formats:["jpg","png","jpeg"]
    }
});

const upload=multer({storage:storage,
    limits:{filesize:3*1024*1024}
});

module.exports=upload;