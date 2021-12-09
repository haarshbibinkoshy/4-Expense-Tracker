const express = require('express')
const controller=require('../controllers/forgotPassword')
const router=express.Router()

router.post(`/password/forgotpassword`,controller.forgotPassword)

module.exports = router