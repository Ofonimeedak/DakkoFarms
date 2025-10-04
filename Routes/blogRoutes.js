const express=require('express');
const upload=require('../multer');
const route=express.Router();
const blogController=require('../Controller/blogControllers')

route.post('/post', upload.array('images',5), blogController.newBlogPost);
route.get('/read/:headline',blogController.readPost);
route.put('/update/:headline',upload.array('images',5), blogController.updatePost)
route.delete('/delete/:headline',blogController.deleteBlog)

module.exports=route;