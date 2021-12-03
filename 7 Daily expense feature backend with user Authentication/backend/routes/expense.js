
const express = require('express')
const { authorization } = require('../controllers/authorization')
const controller = require('../controllers/expenseController')
const route=express.Router()

route.post(`/addExpense`,authorization,controller.addExpense)
route.get(`/getExpense`,authorization,controller.getExpense)

module.exports=route