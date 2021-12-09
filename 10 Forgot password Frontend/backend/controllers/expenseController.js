const Expense = require("../models/expense");
const Leaderboard = require("../models/leaderboard");

exports.addExpense= async(req, res,next) => {
    const{expenseAmount,category,description} = req.body;
//     console.log(req.body);
// console.log(amount,category,description);
 const exp= await req.user.createExpense({expenseAmount,category,description})
//  console.log(exp);
console.log(`<<<<<<<<<<<<<<<<<<<<<<he`);
 const userExists= await Leaderboard.findAll({where:{userId:req.user.id}})
 console.log(`<<<<<<<<<<<<<<<<<<<<<<hello`);
 if (userExists.length>0) {
  const oldAmount= userExists[0].totalExpense
  console.log(userExists);
   const updatedExpense=Number(oldAmount) + Number(expenseAmount)
   console.log(updatedExpense,`>>>>>>>>>>>>>>>>>>>>>>>>>>>>updated`);
await Leaderboard.update({totalExpense:String(updatedExpense) },{where:{userId:req.user.id}})

 }else{
   await Leaderboard.create({totalExpense: expenseAmount,userId:req.user.id,userName:req.user.name})
  
 }
 res.json({exp})

    
}
exports.getExpense= async(req, res, next) => {
    
  let expenses= await Expense.findAll({where:{userId:req.user.id}})
   console.log(req.user.id);
   let rental=food=electricity=grocery=medical=travel=0
   
   for (const exp of expenses) {
    let{expenseAmount,category}=exp
    if (category==`rental`) {
      rental+=parseInt(expenseAmount) 
    }else if (category==`food`){
      food+=parseInt(expenseAmount) 
    }else if (category==`electricity`){
      electricity+=parseInt(expenseAmount) 
    }else if (category==`grocery`){
      grocery+=parseInt(expenseAmount) 
    }else if (category==`medical`){
      medical+=parseInt(expenseAmount) 
    }else if (category==`travel`){
      travel+=parseInt(expenseAmount) 
    }
    
}
res.json({rental,food,electricity,grocery,travel,medical})

   
}