require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const sequelize=require('./utils/database')
//routes
const signupRoute=require('./routes/signup')
const loginRoute=require('./routes/login')
const expenseRoute=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')
const isPremium=require('./routes/isPremium')
//models
const User = require('./models/users')
const Expense = require('./models/expense')
const Order = require('./models/orders')

const app = express()
app.use(cors())
app.use(express.json())
app.use(signupRoute)
app.use(loginRoute)
app.use(purchaseRoutes)
app.use(expenseRoute)
app.use(isPremium)



User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

sequelize
// .sync({force: true})
.sync()
.then(() => {
console.log(`>>>>>>>>>>>>>>>>table created`);
}).catch((err) => {
    console.log(`>>>>>>>>>>>>>`,err);
})
app.listen(3000)