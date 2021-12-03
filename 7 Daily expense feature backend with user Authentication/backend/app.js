require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const sequelize=require('./utils/database')
//routes
const signupRoute=require('./routes/signup')
const loginRoute=require('./routes/login')
const expenseRoute=require('./routes/expense')
//models
const User = require('./models/users')
const Expense = require('./models/expense')

const app = express()
app.use(cors())
app.use(express.json())
app.use(signupRoute)
app.use(loginRoute)
app.use(expenseRoute)


User.hasMany(Expense)
Expense.belongsTo(User)

sequelize
// .sync({force: true})
.sync()
.then(() => {
console.log(`>>>>>>>>>>>>>>>>table created`);
}).catch((err) => {
    console.log(`>>>>>>>>>>>>>`,err);
})
app.listen(3000)