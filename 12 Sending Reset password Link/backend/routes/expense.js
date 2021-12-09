
const express = require('express')
const { authorization } = require('../controllers/authorization')
const controller = require('../controllers/expenseController')
const router=express.Router()

router.post(`/addExpense`,authorization,controller.addExpense)
router.get(`/getExpense`,authorization,controller.getExpense)

module.exports=router