const express=require('express');

const cartControllers=require('../Controller/cartControllers');
 const route =express.Router();

 route.post('/add/:userId', cartControllers.addItem);
 route.delete('/remove/:userId', cartControllers.removeItem);



 module.exports=route;