const express=require('express');
const route=express.Router();
const urlcontrollers=require('../URlShorteningService/urlControllers')

route.post('/long',urlcontrollers.short)
route.get('/short/:shortId',urlcontrollers.getShortUrl)

module.exports=route;