const Expense = require("../models/expense");
const Leaderboard = require("../models/leaderboard");



exports.leaderboard=async (req, res)=>{
    
let a= await Leaderboard.findAll({order:[['totalExpense','DESC']]})
console.log(a);
res.json(a);

}