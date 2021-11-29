const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const signupRoute=require('./routes/signup')
const sequelize=require('./utils/database')

const app = express()
app.use(express.urlencoded({extended:false}))
app.use(signupRoute)

sequelize.sync()
.then(() => {
console.log(`>>>>>>>>>>>>>>>>table created`);
}).catch((err) => {
    console.log(`>>>>>>>>>>>>>`,err);
})
app.listen(3000)