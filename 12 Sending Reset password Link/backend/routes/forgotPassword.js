const express = require('express')
const controller=require('../controllers/forgotPassword')
const router=express.Router()

router.post(`/password/forgotpassword`,controller.forgotPassword)

router.get(`/password/resetpassword/:id`,controller.resetpassword)

router.get(`/password/updatepassword/:id`,controller.updatepassword)
module.exports = router