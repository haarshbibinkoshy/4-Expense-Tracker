const express = require('express')
const { authorization } = require('../controllers/authorization')
const controller = require('../controllers/leaderboard')
const router=express.Router()

router.get(`/leaderboard`,authorization,controller.leaderboard)
module.exports =router