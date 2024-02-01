const express = require('express');
const FrontController = require('../controllers/FrontController');
const route = express.Router();



//route
route.get("/",FrontController.login);
route.get("/register",FrontController.register);
route.get("/home",FrontController.home);
//datainsert
route.post('/insertreg',FrontController.insertReg);
route.post('/vlogin',FrontController.vlogin);

  module.exports =route;