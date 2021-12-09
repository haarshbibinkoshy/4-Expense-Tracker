const lists=document.querySelector(`.lists`)
const table=document.querySelector(`table`)

window.addEventListener('DOMContentLoaded', async()=>{
    let token=JSON.parse(localStorage.getItem(`JWTTOKEN`)  ) 
    let {data}= await axios.get(`http://localhost:3000/leaderboard`,{headers:{'Authorization':token}})
    
    data.map((d,i)=>{
      let tr=  document.createElement(`tr`)
        tr.innerHTML=`
        <td>${i+1}</td>
        <td>${d.userName}</td>
        <td>${d.totalExpense}</td>`
        table.appendChild(tr)
      
    })
    console.log(data);
    
})