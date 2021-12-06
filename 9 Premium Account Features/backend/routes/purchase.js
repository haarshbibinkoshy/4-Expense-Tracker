const express = require('express');
const { authorization } = require('../controllers/authorization');
const controller=require('../controllers/purchase')
const router = express.Router();


router.post(`/updatetransactionstatus`,authorization,controller.updateTransactionStatus)
router.get(`/premiummembership`,authorization,controller.purchasepremium)
module.exports=router