const express = require('express');
const controller=require('../controllers/signUpController');


const router=express.Router();



router.post(`/signup`,controller.signUp)

module.exports=router