const Expense = require("../models/expense");

exports.addExpense= async(req, res,next) => {
    const{expenseAmount,category,description} = req.body;
//     console.log(req.body);
// console.log(amount,category,description);
 const exp= await req.user.createExpense({expenseAmount,category,description})
 console.log(exp);
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