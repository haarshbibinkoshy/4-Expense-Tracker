const User = require("../models/users")

exports.isPremium=async(req, res)=>{
    res.json(req.user.ispremiumuser)
    

}
