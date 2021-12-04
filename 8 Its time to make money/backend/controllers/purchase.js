const Razorpay = require('razorpay');
const Order = require('../models/orders');
// const dotenv = require('dotenv');

// // get config vars
// dotenv.config();
const purchasepremium=async(req,res)=>{
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount=2000
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err) {
                throw new Error(err);
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch (error) {
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}
const updateTransactionStatus=(req, res) => {
    try {
        const {payment_id,order_id}=req.body
        Order.findOne({where:{orderid:order_id}}).then(order=>{
            order.update({paymentid:payment_id,status:'SUCCESSFUL'}).then(()=>{
                req.user.update({ispremiumuser: true})
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err) => {throw new Error(err)})
        }).catch((err) => {throw new Error(err)})
    } catch (error) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })
    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}
