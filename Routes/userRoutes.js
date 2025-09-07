const express = require("express");
const route = express.Router();
const userController = require("../Controller/UserController");
const tokenMiddleware=require("../Middleware/authMiddleware")

route.post('/register', userController.register);
route.post('/login', userController.login);
route.post('/logout', userController.logout);
route.get('/get', userController.getUser);
route.put('/update', userController.updateUser);
route.patch('/role', userController.userRole);
route.delete('/delete', userController.deleteUser);
route.get('/profile', tokenMiddleware, userController.profile);
route.post('/reset', userController.resetPassword);

module.exports = route;
