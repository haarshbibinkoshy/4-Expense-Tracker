const  nodemailer = require('nodemailer');


exports.forgotPassword=(req, res)=>{
    
    
    const {email}=req.body
    console.log(email);
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'haarshbibinkoshy.4127.92@gmail.com',
          pass: ''//gmail password
        }
      });
      
      var mailOptions = {
        from: 'haarshbibinkoshy.4127.92@gmail.com',
        to: `${email}`,
        subject: 'Sending Email using Node.js',
        text: `${email}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.json(info.response);
        }
      });
      
}