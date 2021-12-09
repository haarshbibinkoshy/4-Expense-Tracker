const express = require('express')
const { authorization } = require('../controllers/authorization')
const controller = require('../controllers/isPremium')
const router=express.Router()

router.get(`/isPremium`,authorization,controller.isPremium)
module.exports =router