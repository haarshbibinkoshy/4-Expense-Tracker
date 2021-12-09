const User = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

function generateAccessToken(id) {
    return jwt.sign(id, process.env.TOKEN_SECRET);
  }

exports.login=(req, res) => {
    const {email,password} = req.body
    User.findAll({where:{email:email}}).then((user) => {
        if (user.length>0) {
            console.log(user[0]);
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if (err) {
                   return res.json({success: false,message: `something went wrong`})
                }
                if (result) {
                    const token = generateAccessToken(user[0].id)
                    return res.json({token:token,success: true,message:`Successfully Logged In`,user:user[0].name})
                }else{
                  return res.status(401).json({success: false,message:`password does not match`})
                }
            });
        }else{
            return res.status(404).json({message:`user not found`})
        }
    }).catch((err) => {console.log(err);})
}