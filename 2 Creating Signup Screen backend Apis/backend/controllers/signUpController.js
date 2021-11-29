const User = require(`../models/users`)
const bcrypt = require('bcrypt');

exports.signUp=(req, res, next) => {
    const{name, email,phone, password}=req.body
phone.toString()
    const saltRounds = 5;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            if (err) {
                console.log(`unable to create new user`);
                res.json({message:`unable to create new user`});
            }
            User.create({name,email,phone,password:hash}).then(()=>{
                res.status(201).json({message:`user created`});
            }).catch((err) => {
                res.status(403).json({success:false,error:err})
            })
        });
    });
    
}