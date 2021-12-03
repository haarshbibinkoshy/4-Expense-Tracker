let arr=[['expense', 'amount']]
let rental=food=electricity=grocery=medical=travel=0



async function expenseSubmit(event) {
    event.preventDefault();
    const form=new FormData(event.target)
    const expenseDetails={
      expenseAmount:form.get(`expenseAmount`),
        category:form.get(`category`),
        description:form.get(`description`)
    }
    console.log(expenseDetails);
    let token=  localStorage.getItem(`JWTTOKEN`)
    console.log(token);
    
    const res=await axios.post(`http://localhost:3000/addExpense`,expenseDetails,{headers:{'Authorization':token}})
    
    console.log(res);
    if (expenseDetails.category==`rental`) {
      rental+=expenseDetails.expenseAmount
    }else if(expenseDetails.category==`food`){
      food+=expenseDetails.expenseAmount
    }else if(expenseDetails.category==`electricity`){
      electricity+=expenseDetails.expenseAmount
    }else if(expenseDetails.category==`grocery`){
      grocery+=expenseDetails.expenseAmount
    }else if(expenseDetails.category==`medical`){
      medical+=expenseDetails.expenseAmount
    }else if(expenseDetails.category==`travel`){
      travel+=expenseDetails.expenseAmount
    }
    window.location.href = "../expense/expense.html";
    // rental=food=electricity=grocery=medical=travel=0
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

}

window.addEventListener('DOMContentLoaded',async () => {
  let token=  localStorage.getItem(`JWTTOKEN`)
 const {data:expenses}= await axios.get(`http://localhost:3000/getExpense`,{headers:{'Authorization':token}})
 console.log(expenses);

// for (const exp of expenses) {
//   let{expenseAmount,category}=exp
//   if (category==`rental`) {
//     rental+=parseInt(expenseAmount) 
//   }else if (category==`food`){
//     food+=parseInt(expenseAmount) 
//   }else if (category==`electricity`){
//     electricity+=parseInt(expenseAmount) 
//   }else if (category==`grocery`){
//     grocery+=parseInt(expenseAmount) 
//   }else if (category==`medical`){
//     medical+=parseInt(expenseAmount) 
//   }else if (category==`travel`){
//     travel+=parseInt(expenseAmount) 
//   }
  
// }
rental=expenses.rental;

food=expenses.food;
electricity=expenses.electricity;
grocery=expenses.grocery;
medical=expenses.medical;
travel=expenses.travel;

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  let data = google.visualization.arrayToDataTable(
    [
      ['expense', 'amount'],
     [`rental`,rental],['travel',travel],[`food`,food],[`electricity`,electricity],[`grocery`,grocery],[`medical`,medical]
    ]
    );
  
  var options = {
      title: '',
      pieHole: 0.4,
    };
  
  var chart = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);
  }

});
// electricity=grocery=medical=travel

