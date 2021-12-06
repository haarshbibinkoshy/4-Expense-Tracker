const nav= document.querySelector('nav')
const rzpBtn= document.querySelector(`#rzp-button1`)
const mainContainer= document.querySelector(`.main-container`)
const leaderboardBtn= document.querySelector(`#leaderbord`)

let arr=[['expense', 'amount']]
let rental=food=electricity=grocery=medical=travel=0


async function expenseSubmit(event) {
  let token=JSON.parse(localStorage.getItem(`JWTTOKEN`)) 
    event.preventDefault();
    const form=new FormData(event.target)
    const expenseDetails={
      expenseAmount:form.get(`expenseAmount`),
        category:form.get(`category`),
        description:form.get(`description`)
    }
    console.log(expenseDetails);
    
    const res=await axios.post(`http://localhost:3000/addExpense`,expenseDetails,{headers:{'Authorization':token}})
    
    console.log(res);

    window.location.href = "../expense/expense.html";
 
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

}

window.addEventListener('DOMContentLoaded',async () => {
  let token=JSON.parse(localStorage.getItem(`JWTTOKEN`)) 
 const {data:expenses}= await axios.get(`http://localhost:3000/getExpense`,{headers:{'Authorization':token}})
 console.log(expenses);

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
  const res=await axios.get(`http://localhost:3000/isPremium`,{headers:{'Authorization':token}})
  console.log(res.data);
  const isPremium=res.data


  //if premium user
  if(isPremium){
    nav.classList.add('active')
    rzpBtn.classList.add('active')
    mainContainer.classList.add('active')
    leaderboardBtn.classList.add('active')
  }
  

});


//payment handling

document.getElementById('rzp-button1').onclick=async function(e){
  let token=JSON.parse(localStorage.getItem(`JWTTOKEN`)  ) 
  console.log(token);
  const response =await axios.get(`http://localhost:3000/premiummembership`,{headers:{'Authorization':token}})
  console.log(response);
  var options= {
    "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
    "name": "Test Company",
    "order_id": response.data.order.id, // For one time payment
    "prefill": {
      "name": "Test User",
      "email": "test.user@example.com",
      "contact": "7003442036"
    },
    "theme": {
     "color": "#3399cc"
    },
    // This handler function will handle the success payment
    "handler": function (response) {
        console.log(response);
        axios.post('http://localhost:3000/updatetransactionstatus',{
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
        }, { headers: {'Authorization' : token} }).then(() => {
            alert('You are a Premium User Now')
        }).catch(() => {
            alert('Something went wrong. Try Again!!!')
        })
    },
 }; 
 const rzp1 = new Razorpay(options);
 rzp1.open();
 e.preventDefault();

 rzp1.on('payment.failed', function (response){
 alert(response.error.code);
 alert(response.error.description);
 alert(response.error.source);
 alert(response.error.step);
 alert(response.error.reason);
 alert(response.error.metadata.order_id);
 alert(response.error.metadata.payment_id);
});
}

//leaderboead

leaderboardBtn.addEventListener('click',async()=>{
  
  window.location.href = "../leaderboard/leaderboard.html";
  
})