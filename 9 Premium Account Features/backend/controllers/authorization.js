const jwt = require('jsonwebtoken');
const User = require('../models/users');
const dotenv = require('dotenv');


// get config vars
dotenv.config();

exports.authorization=async(req, res, next)=>{
    try {
        
        console.log(req.header('Authorization'));
        let jwtToken=req.header('Authorization') 
        console.log(typeof jwtToken);
        console.log(jwtToken,'jwttoken>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        const userId=await jwt.verify(jwtToken,process.env.TOKEN_SECRET)
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>`,userId);
       const userExists=await User.findByPk(userId);
       console.log(userExists);
       if (userExists) {
           req.user=userExists
           
           next();
       }else{
           res.json({success:false,message:`user does not exist`});
       }
        
        //  User.findByPk(1).then((user)=>{
        //      console.log(user);
        //      req.user=user;
        //      next()
        //  }).catch((error)=>{throw new Error(error)})
    } catch (error) {
        return res.status(401).json({success: false,message:`jwtTokenerror`});
    }
  
}