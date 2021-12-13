
const table=document.querySelector(`table`)
let totalExpense=0
let totalIncome=0
window.addEventListener(`DOMContentLoaded`,async()=>{
    let token=JSON.parse(localStorage.getItem(`JWTTOKEN`)) 
    const {data:expenses}= await axios.get(`http://localhost:3000/getExpense`,{headers:{'Authorization':token}})
    console.log(expenses);
    console.log(`hi`);
    rental=expenses.rental;
    food=expenses.food;
    electricity=expenses.electricity;
    grocery=expenses.grocery;
    medical=expenses.medical;
    travel=expenses.travel;
    salary=expenses.salary;
    for (const key in expenses) {
        let tr=  document.createElement(`tr`)
        if (key!==`salary`) {
            tr.innerHTML=`
            <td>${key}</td>
            <td>${expenses[key]}</td>
            <td>${0}</td>`
            totalExpense+=expenses[key]
            
        }else{
            tr.innerHTML=`
            <td>${key}</td>
            <td>${0}</td>
            <td>${expenses[key]}</td>`
            totalIncome+=expenses[key]

        }
        table.appendChild(tr)
        
        
    
}
let tr=  document.createElement(`tr`)
let tr1=  document.createElement(`tr`)
tr.innerHTML=`
<td><h3>Total:</h3></td>
<td>${totalExpense}</td>
<td>${totalIncome}</td>`

let savings=totalIncome-totalExpense
tr1.innerHTML=`<td><h3>Total Savings:</h3></td>
<td>${savings}</td>
<td></td>`
table.appendChild(tr)
table.appendChild(tr1)
console.log(totalExpense);
console.log(totalIncome);
    
       
})
