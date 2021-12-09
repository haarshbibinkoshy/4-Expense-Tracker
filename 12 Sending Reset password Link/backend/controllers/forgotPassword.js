const  nodemailer = require('nodemailer');
const uuid = require('uuid')
const bcrypt = require('bcrypt');

const User=require('../models/users')
const password = require('../models/password')

exports.forgotPassword=async(req, res)=>{
   try {
    const {email}=req.body
    console.log(email);
    const user=await User.findOne({where: {email}})

    if (user) {
      const id=uuid.v4()
      user.createPassword({id, active:true})
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'haarshbibinkoshy.4127.92@gmail.com',
          pass: 'Koshysugi18@'//gmail password
        }
      });
      
      var mailOptions = {
        from: 'haarshbibinkoshy.4127.92@gmail.com',
        to: `${email}`,
        subject: 'Sending Email using Node.js',
        text: `${email}`,
        html:`<a href=http://localhost:3000/password/resetpassword/${id}>reset</a>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.json(info.response);
        }
      });
    }else{
      throw new Error(`user doesnt exist`)
    }
     
   } catch (error) {
     console.err(err);
     return res.json({message:err,success:false})
   } 
    
    
      
}

exports.resetpassword=async(req, res)=>{
  try {
    const id=req.params.id;
  const userExists= await password.findOne({where:{id}})
  if (userExists) {
    userExists.update({active:false})
    res.status(200).send(`<html>
    <script>
        function formsubmitted(e){
            e.preventDefault();
            console.log('called')
        }
    </script>

    <form action="/password/updatepassword/${id}" method="get">
        <label for="newpassword">Enter New password</label>
        <input name="newpassword" type="password" required></input>
        <button>reset password</button>
    </form>
</html>`)
    
  }else{
    throw new Error(`user not found`)
  }
  } catch (error) {
    console.error(error);
  }
  
}
exports.updatepassword = async(req, res) => {
  try {
    const passwordid=req.params.id
    const {newpassword}=req.query
    const userInPassword= await password.findOne({where:{id:passwordid}})
    
    const user=await User.findOne({where:{id:userInPassword.userId}})
    console.log(user);
    if (user) {
      const saltRounds = 5
      bcrypt.genSalt(saltRounds,function(err,salt){
        if (err) {
          console.log(err);
          throw new Error(err)
        }
        bcrypt.hash(newpassword,salt,function(err, hash){
          if (err) {
            console.log(err);
            throw new Error(err)
          }
          user.update({password:hash}).then(()=>{
            res.status(201).json({message:`succesfully updated password`})
          })
        })
      })
    }else{
      return res.status(404).json({message:`No user Exists`, success:false})
    }
  } catch (error) {
    return res.status(403).json({error,success:false})
  }
 
}